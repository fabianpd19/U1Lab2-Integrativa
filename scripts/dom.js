export class DOMManager {
    constructor() {
        this.timelineContainer = document.getElementById("timelineContainer");
        this.template = document.getElementById("task-template");
        this.progressBar = document.getElementById("progressBar");
    }

    updateTimeline(tasks) {
        if (!this.timelineContainer || !this.template) return;
        this.timelineContainer.innerHTML = ""; // Limpiar la línea de tiempo

        tasks.forEach((task, index) => {
            // Clonar el template
            const taskElement = this.template.content.cloneNode(true);
            
            // Obtener elementos del template clonado
            const colDiv = taskElement.querySelector(".col-md-6");
            const customCard = taskElement.querySelector(".custom-card");
            const taskTitle = taskElement.querySelector(".custom-task-title");
            const taskDescription = taskElement.querySelector(".task-description");
            const taskTime = taskElement.querySelector(".date-task");
            const completeButton = taskElement.querySelector(".complete-btn");
            const undoButton = taskElement.querySelector(".undo-btn");
            const deleteButton = taskElement.querySelector(".delete-btn");

            // Actualizar contenido
            taskTitle.textContent = task.title;
            taskDescription.textContent = task.description;
            taskTime.innerHTML = `<strong>Inicio:</strong> ${new Date(
                task.start_time
            ).toLocaleString()} | <strong>Fin:</strong> ${new Date(
                task.end_time
            ).toLocaleString()}`;

            // Configurar botones
            completeButton.dataset.index = index;
            undoButton.dataset.index = index;
            deleteButton.dataset.index = index;

            // Mostrar/ocultar botones según el estado
            if (task.completed) {
                customCard.classList.add("completed");
                completeButton.style.display = "none";
                undoButton.style.display = "inline-block";
            } else {
                customCard.classList.remove("completed");
                completeButton.style.display = "inline-block";
                undoButton.style.display = "none";
            }

            // Añadir el elemento clonado al contenedor
            this.timelineContainer.appendChild(taskElement);
        });

        // Actualizar barra de progreso
        this.updateProgress(tasks);
    }

    updateProgress(tasks) {
        if (!this.progressBar) return;
        
        const completedTasks = tasks.filter((task) => task.completed).length;
        const totalTasks = tasks.length;
        const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

        this.progressBar.style.width = `${progress}%`;
        this.progressBar.textContent = `${progress}% Completado`;
    }
}

// Exportar una instancia por defecto para uso inmediato
export const domManager = new DOMManager();
