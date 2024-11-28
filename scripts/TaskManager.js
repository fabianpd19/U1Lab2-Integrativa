// Módulo TaskManager.js
export default class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.tasks.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    }

    getTasks() {
        return this.tasks;
    }
}
