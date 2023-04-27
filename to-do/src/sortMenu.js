class SortMenu {

    constructor(button, taskList) {
        this.button = button;
        this.taskList = taskList;
        this.element = document.createElement('ul');
        this.element.className = 'sort-menu';
        this.dateItem = document.createElement('li');
        this.dateItem.textContent = 'By date';
        this.dateItem.className = 'sort-menu-item';
        this.nameItem = document.createElement('li');
        this.nameItem.textContent = 'By name';
        this.nameItem.className = 'sort-menu-item';
        this.statusItem = document.createElement('li');
        this.statusItem.textContent = 'By status';
        this.statusItem.className = 'sort-menu-item';
        this.element.append(this.dateItem);
        this.element.append(this.nameItem);
        this.element.append(this.statusItem);
        this.dateItem.addEventListener('click', this.handleDateItemClick.bind(this));
        this.nameItem.addEventListener('click', this.handleNameItemClick.bind(this));
        this.statusItem.addEventListener('click', this.handleStatusItemClick.bind(this));
        this.element.style.display = 'none';
    }

    toggle = () => {
        const { element, button: { element: buttonElement } } = this;
        if (element.style.display === 'none') {
            element.style.display = 'flex';
            buttonElement.append(element);
        } else {
            element.style.display = 'none';
            buttonElement.removeChild(element);
        }
    }

    handleDateItemClick = () => {
        const { taskList } = this;
        taskList.sortTasks('date');
    }

    handleNameItemClick = () => {
        const { taskList } = this;
        taskList.sortTasks('name');
    }

    handleStatusItemClick = () => {
        const { taskList } = this;
        taskList.sortTasks('status');
    }
}

export default SortMenu;