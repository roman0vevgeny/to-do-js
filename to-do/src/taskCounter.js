export class TaskCounter {

    constructor(container) {
        this.element = document.createElement('span');
        this.element.className = 'task-counter';
        container.appendChild(this.element);
    }

    updateTaskCounter = (taskList) => {
        const taskCount = taskList.tasks.length;
        this.element.textContent = ` Tasks: ${taskCount}`;
    };
}