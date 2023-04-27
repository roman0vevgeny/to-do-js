import { formatDate } from './helpers.js';

class TaskItem {

    constructor(task, parent) {
        this.parent = parent;
        const { id, name, completed, date } = task;
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.date =  date;
        this.dateSpan = document.createElement('span');
        this.dateSpan.className = 'task-item-date';
        this.dateSpan.innerText = formatDate(date);
        this.element = document.createElement('li');
        this.element.className = 'task-item';
        this.taskDiv = document.createElement('div');
        this.taskDiv.className = 'task-div';
        this.checkmark = document.createElement('span');
        this.checkmark.className = 'checkmark';
        this.checkbox = document.createElement('input');
        this.checkbox.type = 'checkbox';
        this.checkbox.checked = this.completed;
        this.checkbox.className = 'task-item-checkbox';
        this.taskName = document.createElement('span');
        this.taskName.className = 'task-item-title';
        this.taskName.textContent = this.truncateName(this.name);
        this.element.appendChild(this.taskDiv);
        this.taskDiv.appendChild(this.checkbox);
        this.taskDiv.appendChild(this.checkmark);
        this.taskDiv.appendChild(this.taskName);
        this.editButton = document.createElement('button');
        this.editButton.className = 'task-item-edit-button';
        this.editButton.textContent = 'Edit';
        this.deleteButton = document.createElement('button');
        this.deleteButton.className = 'task-item-delete-button';
        this.deleteButton.textContent = 'Delete';
        this.containerDiv = document.createElement('div');
        this.containerDiv.className = 'task-item-container';
        this.element.appendChild(this.containerDiv);
        this.containerDiv.appendChild(this.dateSpan);
        this.containerDiv.appendChild(this.editButton);
        this.containerDiv.appendChild(this.deleteButton);
        this.title = this.element.querySelector('.task-item-title');
        this.editButton = this.element.querySelector('.task-item-edit-button');
        this.deleteButton = this.element.querySelector('.task-item-delete-button');
        this.checkbox.addEventListener('change', (event) => {
            const { target: { checked } } = event;
            this.completed = checked;
            this.parent.updateTask(this.id, { completed: checked });
        });
        this.editButton.addEventListener('click', () => {
            this.handleEditButtonClick();
        });
        this.deleteButton.addEventListener('click', () => {
            this.handleDeleteButtonClick();
        });
        this.taskDiv.addEventListener('click', (event) => {
            if (event.target !== this.checkbox) {
                this.checkbox.checked = !this.checkbox.checked;
                this.handleCheckboxChange({ target: this.checkbox });
            }
        });
    }

    handleCheckboxChange = ({ target: { checked } }) => {
        this.completed = checked;
        this.parent.updateTask(this.id, { completed: checked });
    }

    truncateName = (name) => {
        return name.length <= 50 ? name : `${name.substring(0, 45)}...`;
    }

    handleEditButtonClick = () => {
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.value = this.name;
        this.input.className = 'task-item-input';
        this.title.replaceWith(this.input);
        this.input.addEventListener('keydown', ({ key }) => {
            if (key === 'Enter') {
                this.handleInputBlur(event);
            }
        });
        this.input.addEventListener('blur', this.handleInputBlur);
        this.input.focus();
    }

    handleInputBlur = (event) => {
        const { target: { value } } = event;
        const trimmedValue = value.trim();
        if (trimmedValue) {
            this.name = trimmedValue;
            this.parent.updateTask(this.id, { name: trimmedValue });
            this.title.textContent = this.truncateName(trimmedValue);
        }
        this.input.replaceWith(this.title);
        this.title.textContent = this.truncateName(this.name);
    }

    handleDeleteButtonClick = () => {
        this.parent.deleteTask(this.id);
    }
}

export default TaskItem;