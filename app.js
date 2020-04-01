const express = require("express");
const app = express();

app.get('/', (req, res) => {
  return res.send({ message: 'O método GET está funcionando corretamente.' });
});

app.post('/', (req, res) => {
  return res.send({ message: 'O método POST está funcionando corretamente.' });
});

app.listen(3000);

module.exports = app;