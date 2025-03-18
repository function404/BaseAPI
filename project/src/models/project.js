let projects = [
   {
      id: 1,
      name: "Criação",
      description: "Criar sistema de tarefas"
   },
   {
      id: 2,
      name: "Deletar",
      description: "deletar sistema de curso"
   }
];

class Project {
   constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
   }

   static fetchProjects() {
      return projects
   }
}

module.exports = Project;
