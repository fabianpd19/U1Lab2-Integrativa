// Módulo dom.js

// Función para actualizar la línea de tiempo en el DOM
export function updateTimeline(tasks) {
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = ''; // Limpiar la línea de tiempo

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Inicio:</strong> ${new Date(task.start_time).toLocaleString()}</p>
            <p><strong>Fin:</strong> ${new Date(task.end_time).toLocaleString()}</p>
        `;

        timelineContainer.appendChild(taskItem);
    });
}
