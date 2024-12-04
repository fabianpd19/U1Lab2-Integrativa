export function updateTimeline(tasks) {
  const timelineContainer = document.getElementById("timelineContainer");
  timelineContainer.innerHTML = ""; // Limpiar la línea de tiempo

  tasks.forEach((task, index) => {
    // Crear el contenedor principal de la tarea
    const colDiv = document.createElement("div");
    colDiv.className = "col-md-6";

    // Crear el contenedor estilizado para la tarea
    const customCard = document.createElement("div");
    customCard.className = `custom-card shadow-sm p-3 ${
      task.completed ? "bg-success text-white" : ""
    }`; // Si la tarea está realizada, se añade una clase de estilo diferente

    // Título de la tarea
    const taskTitle = document.createElement("h5");
    taskTitle.className = "custom-task-title";
    taskTitle.textContent = task.title;

    // Descripción de la tarea
    const taskDescription = document.createElement("p");
    taskDescription.className = "mb-2";
    taskDescription.textContent = task.description;

    // Información de inicio y fin
    const taskTime = document.createElement("p");
    taskTime.className = "text-muted small";
    taskTime.innerHTML = `<strong>Inicio:</strong> ${new Date(
      task.start_time
    ).toLocaleString()} | <strong>Fin:</strong> ${new Date(
      task.end_time
    ).toLocaleString()}`;

    // Botón de marcar como realizada
    const completeButton = document.createElement("button");
    completeButton.className = "btn btn-success btn-sm me-2"; // Botón de éxito
    completeButton.textContent = "Marcar como realizada"; // Texto del botón
    completeButton.dataset.index = index; // Guardar el índice de la tarea

    // Botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm"; // Botón de eliminar
    deleteButton.textContent = "Eliminar"; // Texto del botón
    deleteButton.dataset.index = index; // Guardar el índice de la tarea

    // Añadir los elementos al contenedor de la tarjeta
    customCard.appendChild(taskTitle);
    customCard.appendChild(taskDescription);
    customCard.appendChild(taskTime);
    customCard.appendChild(completeButton);
    customCard.appendChild(deleteButton);

    // Añadir la tarjeta al contenedor de columna
    colDiv.appendChild(customCard);

    // Añadir la columna al contenedor principal
    timelineContainer.appendChild(colDiv);
  });

  // Actualizar barra de progreso
  updateProgress(tasks); // Llama a la función para actualizar la barra de progreso
}

export function updateProgress(tasks) {
  // Filtrar las tareas completadas
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length; // Número total de tareas
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100); // Calcular el porcentaje de progreso

  // Actualizar la barra de progreso
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = `${progress}%`; // Cambiar el ancho de la barra
  progressBar.textContent = `${progress}% Completado`; // Mostrar el porcentaje en texto
}
