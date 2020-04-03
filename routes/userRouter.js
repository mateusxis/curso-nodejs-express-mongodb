const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.send({message: 'O método GET do usuário está funcionando corretamente.'});
});

router.post('/', (req, res) => {
  return res.send({message: 'O método POST do usuário está funcionando corretamente.'});
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  return res.send({message: `O método GET do usuário ${id} está funcionando corretamente.`});
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  return res.send({message: `O método PUT do usuário ${id} está funcionando corretamente.`});
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  return res.send({message: `O método DELETE do usuário ${id} está funcionando corretamente.`});
});

module.exports = router;