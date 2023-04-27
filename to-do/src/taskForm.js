class TaskForm {

    constructor(container, parent) {
        this.container = container;
        this.element = document.createElement('form');
        this.element.className = 'task-form';
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Enter new task';
        this.input.className = 'new-task-input';
        this.button = document.createElement('button');
        this.button.type = 'submit';
        this.button.textContent = 'Add';
        this.button.className = 'task-form-button';
        this.element.appendChild(this.input);
        this.element.appendChild(this.button);
        this.container.append(this.element);
        this.parent = parent;
        this.element.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { value } = this.input;
        const trimmedValue = value.trim();
        if (trimmedValue) {
            this.parent.taskList.addTask(trimmedValue);
            this.input.value = '';
            this.input.focus();
        }
    }
}

export default TaskForm;