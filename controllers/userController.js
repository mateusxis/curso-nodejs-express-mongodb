const UserModel = require('../model/user');

class UserController {
  static async index (req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).send({ error: 'É necessário o id do usuário!' });
    if (typeof id !== 'string') return res.status(400).send({ error: 'O id do usuário não é tipo string!' });
  
    try {
      const user = await UserModel.findById(id);
  
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(401).send({ error: 'Erro ao buscar usuário!' })
      }
    } catch (err) {
      return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    }
  } 
  
  static async show (req, res) {
    try {
      const user = await UserModel.find({});
      
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(401).send({ error: 'Erro ao buscar usuário!' })
      }
    } catch(err) {
      return res.status(500).send({ error: 'Erro ao buscar os usuários!' });
    }
  }
  
  static async create (req, res) {
    const { email, name, password } = req.body;
  
    if (!email || !name || !password) {
      return res.status(400).send({ error: 'São necessário os campos de name, email e password!' });
    }
  
    if (typeof email !== 'string' || typeof name !== 'string' || typeof password !== 'string') {
      return res.status(400).send({ error: 'Os campos não estão com tipo de variável correto!' });
    }
  
    try {
      if (await UserModel.findOne({email})) return res.status(400).send({ error: 'Usuário já existe!' });
      
      const user = await UserModel.create({ email, name, password });
  
      if (user) {
        user.password = undefined;
        return res.status(201).json(user);
      } else {
        return res.status(401).send({ error: 'Erro ao salvar usuário!' })
      }
  
    } catch (err) {
      return res.status(500).send({ error: 'Erro ao salvar usuário!' });
    }
  }
  
  static async update (req, res) {
    const { id } = req.params;
    const { email, name, password } = req.body;
  
    if (!id) return res.status(400).send({ error: 'É necessário o id do usuário!' });
    if (typeof id !== 'string') return res.status(400).send({ error: 'O id do usuário não é tipo string!' });
  
    if (!email && !name && !password) {
      return res.status(400).send({ error: 'É necessário os campos de name ou email ou password!' });
    }
  
    if (
        (email && typeof email !== 'string') || 
        (name && typeof name !== 'string') ||
        (password && typeof password !== 'string')) {
      return res.status(400).send({ error: 'Os campos não estão com tipo de variável correto!' });
    }
  
    try {
      await UserModel.findOneAndUpdate(id, req.body);
      const user = await UserModel.findById(id);
  
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(401).send({ error: 'Erro ao atualizar usuário!' })
      }
    } catch (err) {
      return res.status(500).send({ error: 'Erro ao atualizar o usuário!' });
    }
  }
  
  static async delete (req, res) {
    const { id } = req.params;
  
    if (!id) return res.status(400).send({ error: 'É necessário o id do usuário!' });
    if (typeof id !== 'string') return res.status(400).send({ error: 'O id do usuário não é tipo string!' });
  
    try {
      await UserModel.findByIdAndDelete(id);
      return res.status(200).send({message: 'Usuário deletado com sucesso!'});
    } catch (err) {
      return res.status(500).send({ error: 'Erro ao deletar o usuário!' });
    }
  }
}

module.exports = UserController;
