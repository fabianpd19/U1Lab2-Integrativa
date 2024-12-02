import TaskManager from './TaskManager.js';
import { updateTimeline } from './dom.js';

// Inicializar el TaskManager
const taskManager = new TaskManager();

// Manejar el formulario de añadir tarea
document.getElementById('taskForm').addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtener datos del formulario
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const start_time = document.getElementById('start_time').value;
  const end_time = document.getElementById('end_time').value;

  // Validar campos
  if (!title || !description || !start_time || !end_time) {
    alert('Todos los campos son obligatorios.');
    return;
  }

  // Crear nueva tarea
  const newTask = { title, description, start_time, end_time };

  // Añadir tarea al TaskManager
  taskManager.addTask(newTask);

  // Actualizar la línea de tiempo
  updateTimeline(taskManager.getTasks());

  // Limpiar formulario
  e.target.reset();
});

// Manejar la eliminación de tareas
document.getElementById('timelineContainer').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-danger')) {
    const index = parseInt(e.target.dataset.index, 10); // Obtener índice de la tarea
    taskManager.removeTask(index); // Eliminar tarea del TaskManager
    updateTimeline(taskManager.getTasks()); // Actualizar la línea de tiempo
  }
});
