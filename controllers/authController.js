const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../model/user');

const AuthController = function(){};

AuthController.createUserToken = (userId) => {
  return jwt.sign({ id: userId }, 'ingresso.com2020', { expiresIn: '7d' });
}

AuthController.auth = async (req, res) => {
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
      return res.status(200).json({user,  token: AuthController.createUserToken(user.id)});
    } else {
      return res.status(401).send({ error: 'Erro ao buscar usuário!' })
    }

  } catch (err) {
    return res.status(500).send({ error: 'Erro ao buscar usuário!' });
  }
}

module.exports = AuthController;
