const UserModel = require('../model/user');

class UserController {
  static async index(req, res) {
    const { id } = req.params;

    if (!id) return res.send({ error: 'É necessário o id do usuário!' });

    UserModel.findById(id, (err, data) => {
      if (err) return res.send({ error: 'Erro ao buscar usuário!' });

      return res.send(data);
    })
  } 

  static async show(req, res) {
    UserModel.find({}, (err, data) => {
      if (err) return res.send({ error: 'Erro ao buscar os usuários!' });
  
      return res.send(data);
    });
  }

  static async create(req, res) {
    const { email, name, password } = req.body;

    if (!email || !name || !password) return res.send({ error: 'São necessário os campos de name, email e password!' });

    UserModel.findOne({email}, (err, data) => {
      if (err) return res.send({ error: 'Erro ao buscar usuário!' });
      if (data) return res.send({ error: 'Usuário já existe!' });

      UserModel.create({ email, name, password }, (err, data) => {
        if (err) return res.send({ error: 'Erro ao salvar usuário!' });

        data.password = undefined;

        return res.send(data);
      });
    });
  }

  static async update(req, res) {
    const { id } = req.params;
    const { email, name, password } = req.body;

    if (!id) return res.send({ error: 'É necessário o id do usuário!' });
    if (!email && !name && !password) return res.send({ error: 'É necessário os campos de name ou email ou password!' });
    
    UserModel.findOneAndUpdate(id, req.body, (err, data) => {
      if (err) return res.send({ error: 'Erro ao atualizar o usuário!' });
      UserModel.findById(id, (err, data) => {
        if (err) return res.send({ error: 'Erro ao buscar o usuário!' });

        return res.send(data);
      });
    });
  }

  static async delete(req, res) {
    const { id } = req.params;

    if (!id) return res.send({ error: 'É necessário o id do usuário!' });

    UserModel.findByIdAndDelete(id, (err, data) => {
      if (err) return res.send({ error: 'Erro ao deletar o usuário!' });

      return res.send({message: 'Usuário deletado com sucesso!'});
    });
  }
}

module.exports = UserController;