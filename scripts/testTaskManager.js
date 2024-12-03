// Importar el módulo TaskManager
import TaskManager from "./TaskManager.js";

// Crear una instancia de TaskManager
const taskManager = new TaskManager();

// Crear tareas de ejemplo
const task1 = {
  title: "Tarea 1",
  description: "Primera tarea",
  start_time: "2024-12-02T10:00",
  end_time: "2024-12-02T12:00",
};

const task2 = {
  title: "Tarea 2",
  description: "Segunda tarea",
  start_time: "2024-12-02T08:00",
  end_time: "2024-12-02T09:00",
};

// Agregar tareas al TaskManager
taskManager.addTask(task1);
taskManager.addTask(task2);

// Obtener tareas y mostrar resultados
console.log("Tareas ordenadas:", taskManager.getTasks());
