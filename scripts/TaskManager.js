export default class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.tasks.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  }

  removeTask(index) {
    // Debe ser menor que la longitud del array de tareas (dentro del rango válido).
    if (index >= 0 && index < this.tasks.length) {
      // Si el índice es válido, utiliza el método splice para eliminar la tarea.
      this.tasks.splice(index, 1); // Elimina la tarea en la posición indicada.
      // El primer parámetro indica desde donde se comienza a eliminar.
      // El segundo parámetro la cantidad de elementos a eliminar.
    }
  }

  markAsCompleted(index) {
    // Verificar si el índice es válido
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index].completed = true; // Marcar la tarea como realizada
    }
  }

  unmarkAsCompleted(index) {
    // Nueva función
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index].completed = false;
    }
  }

  getTasks() {
    return this.tasks;
  }
}
