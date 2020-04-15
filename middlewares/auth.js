const jwt = require('jsonwebtoken');

const jwt_pass = process.env.jwt_pass;

const auth = (req, res, next) => {
  const token_header = req.headers.auth;

  if (!token_header) return res.status(400).send({ error: 'Token não enviado!' });
  if (typeof token_header !== 'string') return res.status(400).send({ error: 'Token não está com tipo de variável correto!' });

  try {
    const decoded = jwt.verify(token_header, jwt_pass);

    res.locals.auth_data = decoded;
    return next();
  } catch (err) {
    return res.status(401).send({ error: 'Token inválido!' });
  }
}

module.exports = auth;
