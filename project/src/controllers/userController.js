const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
class UserController {
   async createUsers(req, res) {
      const { name, email, password } = req.body;

      if ( name === undefined || email === undefined || password === undefined) {
         return res.status(400).json('Preencha todos os campos!');
      }

      const existingUser = User.findOne({ where: { email } });
      if (existingUser) {
         return res.status(400).json('Email já cadastrado!');
      }

      const encryptedPassword = await bcrypt.hash(password, saltRounds);

      const user = await User
         .create({ name, email, password: encryptedPassword });

      return res.json(user);
   }

   async getUserById(req, res) {
      const { id } = req.params;
      if (id === undefined) {
         return res.status(400).json('ID não informado!')
      }

      const user = await User.findByPk(id);

      if (!user) {
         return res.status(400).json('Usuário não encontrado!');
     }

      return res.json(user)
   }

   async updateUsers(req, res) {
      const { id } = req.params;
      const { name, email, password } = req.body;
      if ( id === undefined || name === undefined || email === undefined || password === undefined) {
         return res.status(400).json('Preencha todos os campos!')
      }

      const user = User.findByPk(id);
      if (!user) {
         return res.status(404).send('Usuário não encontrado');
      }

      const existingUser = User.findOne({ where: { email } });
      if (existingUser) {
         return res.status(400).json('Email já cadastrado!');
      }

      user.name = name;
      user.email = email;
      user.password = password;

      const encryptedPassword = await bcrypt.hash(password, saltRounds);
      user.password = encryptedPassword;
      user.save();

      return res.status(200).json(user);
   }

   async deleteUsers(req, res) {
      const { id } = req.params;
      if (id === undefined) {
         return res.status(404).send('ID não informado');
      }

      const user = await User.getUserById(id);
      user.destroy();

      return res.status(200).send('Usuário deletado com sucesso');
   }

   async getUsers(req, res) {
      const users = await User.findAll();

      return res.json(users);
   }

   async login(req, res) {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(400).json('Preencha todos os campos!');
      }

      const user = await User.findOne({ where: { email} });
      if (!user) {
         return res.status(400).json('Usuário não encontrado!');
      }

      const isPaswordValid = await bcrypt.compare(password, user.password)
      if (!isPaswordValid) {
         return res.status(400).json('Senha inválida!');
      }

      const jwtToken = jwt.sign({ id: user.id }, 'functionss')

      return res.status(200).json({ token: jwtToken });

   }
}

module.exports = (new UserController());
