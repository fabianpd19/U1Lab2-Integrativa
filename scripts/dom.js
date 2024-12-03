// Módulo dom.js

// Función para actualizar la línea de tiempo en el DOM
export function updateTimeline(tasks) {
  const timelineContainer = document.getElementById("timelineContainer");
  timelineContainer.innerHTML = ""; // Limpiar la línea de tiempo

  tasks.forEach((task) => {
    // ------------------- contenedor principal 
    const colDiv = document.createElement("div");
    colDiv.className = "col-md-6";

    // -----    contenedor de la tarjeta
    const customCard = document.createElement("div");
    customCard.className = "custom-card shadow-sm p-3";

    // ------- Título 
    const taskTitle = document.createElement("h5");
    taskTitle.className = "custom-task-title";
    taskTitle.textContent = task.title;

    // --------------- Descripción 
    const taskDescription = document.createElement("p");
    taskDescription.className = "mb-2";
    taskDescription.textContent = task.description;

    // ------------- inicio y fin
    const taskTime = document.createElement("p");
    taskTime.className = "text-muted small";
    taskTime.innerHTML = `<strong>Inicio:</strong> ${new Date(
      task.start_time
    ).toLocaleString()} | <strong>Fin:</strong> ${new Date(
      task.end_time
    ).toLocaleString()}`;

    // Añadir los elementos al contenedor de la tarjeta
    customCard.appendChild(taskTitle);
    customCard.appendChild(taskDescription);
    customCard.appendChild(taskTime);

    // Añadir la tarjeta al contenedor de columna
    colDiv.appendChild(customCard);

    // Añadir la columna al contenedor principal
    timelineContainer.appendChild(colDiv);
  });
}
