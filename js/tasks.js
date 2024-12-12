document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const taskTemplate = document.getElementById('task-template');

    // Cargar tareas guardadas
    loadTasks();

    // Manejar el envío del formulario
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const task = {
            id: Date.now(),
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            dueDate: document.getElementById('dueDate').value,
            priority: document.getElementById('priority').value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        addTask(task);
        taskForm.reset();
    });

    function addTask(task) {
        // Clonar el template
        const taskElement = taskTemplate.content.cloneNode(true);
        const taskItem = taskElement.querySelector('.task-item');

        // Añadir clase de prioridad
        taskItem.classList.add(`priority-${task.priority}`);
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        // Llenar el contenido
        taskItem.querySelector('.task-title').textContent = task.title;
        taskItem.querySelector('.task-description').textContent = task.description;
        taskItem.querySelector('.task-date').textContent = `Fecha límite: ${formatDate(task.dueDate)}`;

        // Configurar botones
        const completeBtn = taskItem.querySelector('.complete-btn');
        const deleteBtn = taskItem.querySelector('.delete-btn');

        completeBtn.addEventListener('click', () => toggleComplete(task.id));
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        // Guardar el ID de la tarea en el elemento
        taskItem.dataset.taskId = task.id;

        // Añadir la tarea a la lista
        taskList.prepend(taskItem);

        // Guardar en localStorage
        saveTasks();
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(task => addTask(task));
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(taskElement => {
            const id = parseInt(taskElement.dataset.taskId);
            const completed = taskElement.classList.contains('completed');
            return {
                id,
                title: taskElement.querySelector('.task-title').textContent,
                description: taskElement.querySelector('.task-description').textContent,
                dueDate: parseDateFromDisplay(taskElement.querySelector('.task-date').textContent),
                priority: getPriorityFromClasses(taskElement),
                completed,
                createdAt: new Date().toISOString()
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function toggleComplete(taskId) {
        const taskElement = taskList.querySelector(`[data-task-id="${taskId}"]`);
        if (taskElement) {
            taskElement.classList.toggle('completed');
            saveTasks();
        }
    }

    function deleteTask(taskId) {
        const taskElement = taskList.querySelector(`[data-task-id="${taskId}"]`);
        if (taskElement && confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            taskElement.remove();
            saveTasks();
        }
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    function parseDateFromDisplay(displayText) {
        return displayText.replace('Fecha límite: ', '');
    }

    function getPriorityFromClasses(element) {
        const classes = element.classList;
        if (classes.contains('priority-alta')) return 'alta';
        if (classes.contains('priority-media')) return 'media';
        return 'baja';
    }
});
