// Módulo principal app.js
import TaskManager from './TaskManager.js';
import { updateTimeline } from './dom.js';

// Inicializar el TaskManager
const taskManager = new TaskManager();
// Crea una instancia de la clase TaskManager. Esta instancia almacenará las tareas
//  y permitirá manipularlas


// Manejar el formulario de añadir tarea
// escucha el evento submit del formulario con el ID taskForm
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
    // Crea un objeto que representa una tarea
    const newTask = { title, description, start_time, end_time };

    // Añadir tarea al TaskManager
    taskManager.addTask(newTask);

    // Actualizar la línea de tiempo
    updateTimeline(taskManager.getTasks());

    // Limpiar formulario
    e.target.reset();
});