const Project = require('../models/project');

class ProjectController {
   static async getProject(req, res) {
      const projects = await Project.findAll();
      res.json(projects);
   }

   static createProject(req, res) {
      const { name, description } = req.body;
      const id = Project.fetchProjects().length + 1

      const existingProject = Project.fetchProjects().find(p => p.name === name);
      
      if (existingProject) {
         return res.status(400).json('Projeto com esse nome já existe!');
      }

      const project = new Project(id, name, description);
      Project.fetchProjects().push(project);

      res.status(201).json(project);
   }

   static updateProject(req, res) {
      const { id } = req.params;
      const { name, description } = req.body;

      const project = Project.fetchProjects().find(project => project.id == Number(id));

      const existingProject = Project.fetchProjects().find(p => p.name === name);

      if (!project) {
         return res.status(404).send('Projeto não encontrado');
      }

      if (existingProject) {
         return res.status(400).send('Projeto com esse nome já existe!');
      }

      project.name = name;
      project.description = description;
      res.status(200).json(project);
   }

   static deleteProject(req, res) {
      const { id } = req.params;
      const index = Project.fetchProjects().findIndex(project => project.id == id);

      if (index === -1) {
         return res.status(404).send('Projeto não encontrado');
      }

      Project.fetchProjects().splice(index, 1);
      res.status(200).send('Projeto deletado com sucesso');
   }
}

module.exports = ProjectController;
