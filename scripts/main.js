import TaskManager from "./TaskManager.js";
import { updateTimeline } from "./dom.js";

// Inicializar el TaskManager
const taskManager = new TaskManager();

// Manejar el formulario de añadir tarea
document.getElementById("taskForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener datos del formulario
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const start_time = document.getElementById("start_time").value;
  const end_time = document.getElementById("end_time").value;

  // Validar campos
  if (!title || !description || !start_time || !end_time) {
    alert("Todos los campos son obligatorios.");
    return;
  }
  if (new Date(start_time) >= new Date(end_time)) {
    alert("La hora de inicio debe ser anterior a la hora de finalización.");
    return;
  }
  /* if (new Date(start_time) <= new Date()) {
    alert("La hora de inicio no puede ser en el pasado.");
    return;
  } */
  if (new Date(end_time) < new Date()) {
    alert("La hora de finalización no puede ser en el pasado.");
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

// Funcionalidad para mostrar/ocultar el formulario de tareas
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleFormBtn');
    const formSection = document.getElementById('formSection');
    
    if (toggleBtn && formSection) {
        const btnIcon = toggleBtn.querySelector('i');

        toggleBtn.addEventListener('click', function() {
            formSection.classList.toggle('visible');
            if (formSection.classList.contains('visible')) {
                btnIcon.classList.remove('fa-plus');
                btnIcon.classList.add('fa-minus');
                toggleBtn.style.background = 'linear-gradient(45deg, #dc3545, #c82333)';
            } else {
                btnIcon.classList.remove('fa-minus');
                btnIcon.classList.add('fa-plus');
                toggleBtn.style.background = 'linear-gradient(45deg, #007bff, #0056b3)';
            }
        });
    }
});

// gestiona los eventos click que ocurren dentro del contenedor de la línea de tiempo de tareas
// Asocia un listener de clic al elemento HTML con id="timelineContainer"
document.getElementById("timelineContainer").addEventListener("click", (e) => { 
  const index = parseInt(e.target.dataset.index, 10);

  if (e.target.classList.contains("btn-danger")) {
    // Si se hace clic en un botón de eliminar
    const index = parseInt(e.target.dataset.index, 10); // Obtener índice de la tarea
    taskManager.removeTask(index); // Eliminar tarea del TaskManager
    updateTimeline(taskManager.getTasks()); // Actualizar la línea de tiempo
  }

  if (e.target.classList.contains("btn-success")) {
    // Si se hace clic en un botón de marcar como realizada
    const index = parseInt(e.target.dataset.index, 10); // Obtener índice de la tarea
    taskManager.markAsCompleted(index); // Marcar tarea como realizada en el TaskManager
    updateTimeline(taskManager.getTasks()); // Actualizar la línea de tiempo
  }

  if (e.target.classList.contains("btn-warning")) {
    // Manejar botón "Deshacer"
    taskManager.unmarkAsCompleted(index); // Desmarcar tarea como completada
    updateTimeline(taskManager.getTasks());
  }
});
