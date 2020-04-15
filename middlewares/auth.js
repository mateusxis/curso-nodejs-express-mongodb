const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token_header = req.headers.auth;

  if (!token_header) return res.send({ error: 'Token não enviado!' });
  if (typeof token_header === 'string') return res.send({ error: 'Token não está com tipo de variável correto!' });

  jwt.verify(token_header, 'ingresso.com2020', (err, decoded) => {
    if (err) res.send({ error: 'Token inválido!' });

    res.locals.auth_data = decoded;
    return next();
  })
}

module.exports = auth;
