const express = require("express");
const app = express();

app.get('/', (req, res) => {
  const obj = req.query;
  return res.send({ message: `O método GET está funcionando corretamente. Eu sou ${obj.nome}, tenho ${obj.idade} anos!` });
});

app.post('/', (req, res) => {
  return res.send({ message: 'O método POST está funcionando corretamente.' });
});

app.listen(3000);

module.exports = app;