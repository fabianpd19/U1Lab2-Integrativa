export function updateTimeline(tasks) {
  const timelineContainer = document.getElementById("timelineContainer");
  timelineContainer.innerHTML = ""; // Limpiar la línea de tiempo

  tasks.forEach((task, index) => {
    // Crear el contenedor principal de la tarea
    const colDiv = document.createElement("div");
    colDiv.className = "col-md-6";

    // Crear el contenedor estilizado para la tarea
    const customCard = document.createElement("div");
    customCard.className = "custom-card shadow-sm p-3";

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

    // Botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm mt-2";
    deleteButton.textContent = "Eliminar";
    deleteButton.dataset.index = index; // Guardar el índice de la tarea

    // Añadir los elementos al contenedor de la tarjeta
    customCard.appendChild(taskTitle);
    customCard.appendChild(taskDescription);
    customCard.appendChild(taskTime);
    customCard.appendChild(deleteButton);

    // Añadir la tarjeta al contenedor de columna
    colDiv.appendChild(customCard);

    // Añadir la columna al contenedor principal
    timelineContainer.appendChild(colDiv);
  });
}
