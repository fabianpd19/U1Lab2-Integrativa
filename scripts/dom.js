<<<<<<< HEAD
class TaskTimeline extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setupTemplate();
    }

    setupTemplate() {
        this.shadowRoot.innerHTML = `
            <style>
                .timeline-container {
                    display: grid;
                    gap: 1rem;
                    padding: 1rem;
                }
                .task-card {
                    background: var(--background-color, white);
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                }
                .task-card.completed {
                    background-color: var(--completed-color, #e8f5e9);
                }
                .progress-container {
                    margin-bottom: 1rem;
                }
                .progress-bar {
                    background-color: var(--primary-color, #4caf50);
                    height: 20px;
                    border-radius: 10px;
                    transition: width 0.3s ease;
                    text-align: center;
                    color: white;
                }
                .btn {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-right: 0.5rem;
                    color: white;
                }
                .complete-btn {
                    background-color: var(--success-color, #4caf50);
                }
                .undo-btn {
                    background-color: var(--warning-color, #ff9800);
                }
                .delete-btn {
                    background-color: var(--danger-color, #f44336);
                }
            </style>
            <div class="progress-container">
                <div id="progressBar" class="progress-bar" role="progressbar">0%</div>
            </div>
            <div id="timelineContainer" class="timeline-container"></div>
        `;
    }

    connectedCallback() {
        this.timelineContainer = this.shadowRoot.getElementById("timelineContainer");
        this.progressBar = this.shadowRoot.getElementById("progressBar");
        this.template = document.getElementById("task-template");
    }

    createTaskElement(task, index) {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${task.completed ? 'completed' : ''}`;
        
        taskCard.innerHTML = `
            <h3 class="task-title">${task.title}</h3>
            <p class="task-description">${task.description}</p>
            <p class="task-time">
                <strong>Inicio:</strong> ${new Date(task.start_time).toLocaleString()} | 
                <strong>Fin:</strong> ${new Date(task.end_time).toLocaleString()}
            </p>
            <div class="task-actions">
                <button class="btn complete-btn" data-index="${index}" style="display: ${task.completed ? 'none' : 'inline-block'}">
                    <i class="fas fa-check"></i> Completar
                </button>
                <button class="btn undo-btn" data-index="${index}" style="display: ${task.completed ? 'inline-block' : 'none'}">
                    <i class="fas fa-undo"></i> Deshacer
                </button>
                <button class="btn delete-btn" data-index="${index}">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        `;

        // Configurar event listeners
        const completeBtn = taskCard.querySelector('.complete-btn');
        const undoBtn = taskCard.querySelector('.undo-btn');
        const deleteBtn = taskCard.querySelector('.delete-btn');

        completeBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('complete-task', { 
                detail: { index },
                bubbles: true,
                composed: true
            }));
        });

        undoBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('undo-task', { 
                detail: { index },
                bubbles: true,
                composed: true
            }));
        });

        deleteBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('delete-task', { 
                detail: { index },
                bubbles: true,
                composed: true
            }));
        });

        return taskCard;
    }

    updateTimeline(tasks) {
        if (!this.timelineContainer) return;
        this.timelineContainer.innerHTML = "";

        tasks.forEach((task, index) => {
            const taskElement = this.createTaskElement(task, index);
            this.timelineContainer.appendChild(taskElement);
        });

        this.updateProgress(tasks);
    }
=======
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
>>>>>>> 9f118ce466cbd910482ea19e642f95995bed4e15

    // Actualizar barra de progreso
    this.updateProgress(tasks);
  }

  updateProgress(tasks) {
    if (!this.progressBar) return;

    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    this.progressBar.style.width = `${progress}%`;
    this.progressBar.textContent = `${progress}% Completado`;
  }
}

// Registrar el componente
customElements.define('task-timeline', TaskTimeline);
