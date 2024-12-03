// Módulo dom.js

// Función para actualizar la línea de tiempo en el DOM
export function updateTimeline(tasks) {
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = ''; // Limpiar la línea de tiempo

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'col-md-6'; // Columna para diseño responsivo

        // Crear el contenedor de la tarea
        const taskCard = document.createElement('div');
        taskCard.className = 'custom-card shadow-sm p-4 mb-4';

        // Título de la tarea
        const taskTitle = document.createElement('h5');
        taskTitle.className = 'task-title';
        taskTitle.textContent = task.title;

        // Descripción de la tarea
        const taskDescription = document.createElement('p');
        taskDescription.className = 'task-description mb-2';
        taskDescription.textContent = task.description;

        // Fechas de inicio y fin
        const taskDates = document.createElement('p');
        taskDates.className = 'text-muted small';
        taskDates.textContent = `Inicio: ${new Date(task.start_time).toLocaleString()} | Fin: ${new Date(task.end_time).toLocaleString()}`;

        // Estado de la tarea (botón de estado)
        const taskStatusButton = document.createElement('button');
        taskStatusButton.className = 'btn btn-outline-primary w-100 mt-3';
        taskStatusButton.textContent = task.isCompleted ? 'Cumplido' : 'No cumplido';

        // Cambiar el estado de la tarea al hacer clic
        taskStatusButton.addEventListener('click', () => {
            task.isCompleted = !task.isCompleted;
            taskStatusButton.textContent = task.isCompleted ? 'Cumplido' : 'No cumplido';
            taskStatusButton.classList.toggle('btn-success', task.isCompleted);
            taskStatusButton.classList.toggle('btn-outline-primary', !task.isCompleted);
        });

        // Añadir elementos al contenedor de la tarea
        taskCard.appendChild(taskTitle);
        taskCard.appendChild(taskDescription);
        taskCard.appendChild(taskDates);
        taskCard.appendChild(taskStatusButton);

        // Añadir la tarea a la línea de tiempo
        taskItem.appendChild(taskCard);
        timelineContainer.appendChild(taskItem);
    });
}
