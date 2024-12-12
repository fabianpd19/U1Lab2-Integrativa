import TaskManager from "./TaskManager.js";

// Inicializar el TaskManager
const taskManager = new TaskManager();
const taskTimeline = document.querySelector('task-timeline');

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
    if (new Date(end_time) < new Date()) {
        alert("La hora de finalización no puede ser en el pasado.");
        return;
    }

    // Crear nueva tarea
    const newTask = { title, description, start_time, end_time };

    // Añadir tarea al TaskManager
    taskManager.addTask(newTask);

    // Actualizar la línea de tiempo
    taskTimeline.updateTimeline(taskManager.getTasks());

    // Limpiar formulario
    e.target.reset();
});

// Funcionalidad para mostrar/ocultar el formulario de tareas
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleFormBtn');
    const formSection = document.getElementById('formSection');
    const btnIcon = toggleBtn.querySelector('i');

    // Configurar eventos del timeline
    if (taskTimeline) {
        taskTimeline.addEventListener('complete-task', (e) => {
            const { index } = e.detail;
            taskManager.markAsCompleted(index);
            taskTimeline.updateTimeline(taskManager.getTasks());
        });

        taskTimeline.addEventListener('undo-task', (e) => {
            const { index } = e.detail;
            taskManager.unmarkAsCompleted(index);
            taskTimeline.updateTimeline(taskManager.getTasks());
        });

        taskTimeline.addEventListener('delete-task', (e) => {
            const { index } = e.detail;
            taskManager.removeTask(index);
            taskTimeline.updateTimeline(taskManager.getTasks());
        });

        // Inicializar timeline con las tareas existentes
        taskTimeline.updateTimeline(taskManager.getTasks());
    }

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
});
