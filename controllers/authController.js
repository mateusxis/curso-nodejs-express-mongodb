const jwt = require('jsonwebtoken');

const { jwt_pass } = require('../config');

const UserModel = require('../model/user');

const createUserToken = (userId) => {
  return jwt.sign({ id: userId }, jwt_pass, { expiresIn: '7d' });
}

class AuthController{
    static async auth(req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ error: 'São necessário os campos de email e password!' });
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).send({ error: 'Os campos não estão com tipo de variável correto!' });
    }

    try {
      const user = await UserModel.findOne({email}).select('+password');
      if(!user) return res.status(400).send({ error: 'Usuário não existe!' });

      const toEqualPassword = bcrypt.compare(password, user.password);

      if (!toEqualPassword) return res.status(401).send({ error: 'Erro ao autenticar usuário!' })

      user.password = undefined;

      if (user) {
        return res.status(200).json({user,  token: createUserToken(user.id)});
      } else {
        return res.status(401).send({ error: 'Erro ao buscar usuário!' })
      }

    } catch (err) {
      return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    }
  }
}

module.exports = AuthController;
