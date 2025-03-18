const User = require('../models/user');

class UserController {
   static getUsers(req, res) {
      res.json(User.fetchUsers());
   }

   static createUsers(req, res) {
      const { name, email, password } = req.body;
      const id = User.fetchUsers().length + 1

      const existingUser = User.fetchUsers().find(u => u.email === email);

      if (existingUser) {
         return res.status(400).json('E-mail já cadastrado!');
      }

      const user = new User(id, name, email, password);
      User.fetchUsers().push(user);

      res.status(201).json(user);
   }

   static updateUsers(req, res) {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = User.fetchUsers().find(user => user.id == Number(id));

      const existingUser = User.fetchUsers().find(u => u.email === email);

      if (!user) {
         return res.status(404).send('Usuário não encontrado');
      }

      if (existingUser) {
         return res.status(400).send('Email já cadastrado!')
      }

      user.name = name;
      user.email = email;
      user.password = password;

      res.status(200).json(user);
   }

   static deleteUsers(req, res) {
      const { id } = req.params;
      const index = User.fetchUsers().findIndex(user => user.id == id);

      if (index === -1) {
         return res.status(404).send('Usuário não encontrado');
      }

      User.fetchUsers().splice(index, 1);
      res.status(200).send('Usuário deletado com sucesso');
   }
}

module.exports = UserController;
