const express = require('express');
const UserModel = require('../model/user');

const router = express.Router();

router.get('/', (req, res) => {
  UserModel.find({}, (err, data) => {
    if (err) return res.send({ error: 'Erro ao buscar os usuários!' });

    return res.send(data);
  });
});

router.post('/', (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password ) return res.send({ error: 'São necessário os campos de name, email e password!' });

  UserModel.findOne({email}, (err, data) => {
    if (err) return res.send({ error: 'Error ao buscar usuário!' });
    if (data) return res.send({ error: 'Usuário já existe!' });

    UserModel.create({ email, name, password }, (err, data) => {
      if (err) return res.send({ error: 'Error ao salvar usuário!' });

      data.password = undefined;

      return res.send(data);
    });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) return res.send({ error: 'É necessário o id do usuário!' });

  UserModel.findById(id, (err, data) => {
    if (err) return res.send({ error: 'Error ao buscar usuário!' });

    return res.send(data);
  })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { email, name, password } = req.body;

  if (!id) return res.send({ error: 'É necessário o id do usuário!' });
  if (!email && !name && !password ) return res.send({ error: 'É necessário os campos de name ou email ou password!' });
  
  UserModel.findByIdAndUpdate(id, {email, name, password}, (err, data) => {
    if (err) return res.send({ error: 'Error ao atualizar o usuário!' });

    return res.send(data);
  })

});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) return res.send({ error: 'É necessário o id do usuário!' });

  UserModel.findByIdAndDelete(id, (err, data) => {
    if (err) return res.send({ error: 'Error ao deletar o usuário!' });

    return res.send(data);
  })
});

module.exports = router;