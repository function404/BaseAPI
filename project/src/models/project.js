let projects = [
   {
      id: 1,
      name: "Criação",
      description: "Craira dsakndsaodoaihçsjkdspghi"
   },
   {
      id: 2,
      name: "Deletação",
      description: "deletatrr dsakndsaodoaihçsjkdspghi"
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
