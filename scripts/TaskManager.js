export default class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.tasks.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  }

  removeTask(index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1); // Eliminar tarea por índice
    }
  }

  getTasks() {
    return this.tasks;
  }
}
