const bcrypt = require('bcrypt');

const UserModel = require('../model/user');

class AuthController {
  static async auth (req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'São necessário os campos de email e password!' });

    UserModel.findOne({email}, (err, data) => {
      if(err) return res.send({ error: 'Erro ao buscar usuário!' });
      if(!data) return res.send({ error: 'Usuário não existe!' });
      
      bcrypt.compare(password, data.password, (err, same) => {
        if (!same) return res.send({ error: 'Erro ao autenticar usuário!' })

        data.password = undefined;
        return res.send(data);
      });
    }).select('+password');
  }
}

module.exports = AuthController;