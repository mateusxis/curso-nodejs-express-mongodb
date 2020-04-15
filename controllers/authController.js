const bcrypt = require('bcrypt');

const UserModel = require('../model/user');

class AuthController {
  static async auth (req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'São necessário os campos de email e password!' });
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.send({ error: 'Os campos não estão com tipo de variável correto!' });
    }

    try {
      const user = await UserModel.findOne({email}).select('+password');
      if(!user) return res.send({ error: 'Usuário não existe!' });

      const toEqualPassword = bcrypt.compare(password, user.password);

      if (!toEqualPassword) return res.send({ error: 'Erro ao autenticar usuário!' })

      user.password = undefined;
      return res.send(user);

    } catch (err) {
      return res.send({ error: 'Erro ao buscar usuário!' });
    }
  }
}

module.exports = AuthController;