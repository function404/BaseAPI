const Project = require('../models/project');
const Task = require('../models/task');
const User = require('../models/user');

class TaskController {
   static getTasks(req, res) {
      res.json(Task.fetchTasks());
   }

   static createTasks(req, res) {
      const { title, status, projectId, userId } = req.body;
      const id = Task.length + 1

      const idProject = Project.fetchProjects().find(t => t.id === Number(projectId))
      const iduser = User.fetchUsers().find(t => t.id === Number(userId))

      const existingTask = Task.fetchTasks().find(task => task.title === title);

      const task = new Task(id, title, status, projectId, userId);

      if (!idProject) {
         return res.status(404).send('Projeto não existe');
      }

      if (!iduser) {
         return res.status(404).send('Usuário não existe');
      }

      if (existingTask) {
         return res.status(400).json('Tarefa com esse título já existe!');
      }

      Task.fetchTasks().push(task);

      res.status(201).json(task);
   }

   static updateTasks(req, res) {
      const { id } = req.params;
      const { title, status, projectId, userId } = req.body;

      const idProject = Project.fetchProjects().find(t => t.id === projectId)
      const iduser = User.fetchUsers().find(t => t.id === userId)
      const existingTask = Task.fetchTasks().find(task => task.title === title);

      const task = Task.fetchTasks().find(task => task.id == Number(id));

      if (!task) {
         return res.status(404).send('Tarefa não encontrada');
      }

      if (!idProject) {
         return res.status(404).send('Projeto não existe');
      }

      if (!iduser) {
         return res.status(404).send('Usuário não existe');
      }

      if (existingTask) {
         return res.status(400).send('Tarefa com esse título já existe!')
      }
      
      task.title = title;
      task.status = status;
      task.projectId = projectId;
      Task.userId = userId;

      res.status(200).json(task);
   }

   static deleteTasks(req, res) {
      const { id } = req.params;
      const index = Task.fetchTasks().findIndex(task => task.id == id);

      if (index === -1) {
         return res.status(404).send('Tarefa não encontrada');
      }

      Task.fetchTasks().splice(index, 1);
      res.status(200).send('Tarefa deletada com sucesso');
   }
}

module.exports = TaskController;
