let tasks = [];

class Task {
   constructor(id, title, status, projectId, userId) {
      this.id = id;
      this.title = title;
      this.status = status;
      this.projectId = projectId;
      this.userId = userId;
   }

   static fetchTasks() {
      return tasks
   }
}

module.exports = Task;
