class TaskFilter {

    constructor(container, parent) {
        this.container = container;
        this.element = document.createElement('form');
        this.element.className = 'search-form';
        this.element.setAttribute('autocomplete', 'off');
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.name = 'search';
        this.input.placeholder = 'Search tasks';
        this.input.className = 'search-input';
        this.button = document.createElement('button');
        this.button.type = 'reset';
        this.button.setAttribute('aria-label', 'Clear input');
        this.button.className = 'clear-button';
        this.button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="currentColor">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.426849 4.54471C0.032867 4.1536 0.0328668 3.51643 0.426849 3.12533L2.31508 1.25087C2.705 0.863794 3.33418 0.863794 3.7241 1.25087L8.23229 5.72617C8.62221 6.11325 9.25139 6.11325 9.64131 5.72617L14.1495 1.25087C14.5394 0.863795 15.1686 0.863794 15.5585 1.25087L17.4468 3.12533C17.8407 3.51643 17.8407 4.1536 17.4468 4.54471L12.9594 8.99938C12.5654 9.39048 12.5654 10.0276 12.9594 10.4188L17.1891 14.6176C17.5831 15.0087 17.5831 15.6459 17.1891 16.037L15.3009 17.9115C14.9109 18.2986 14.2818 18.2986 13.8918 17.9115L9.64132 13.692C9.25139 13.3049 8.62221 13.3049 8.23229 13.692L3.98177 17.9115C3.59184 18.2986 2.96266 18.2986 2.57274 17.9115L0.684513 16.037C0.290532 15.6459 0.290532 15.0087 0.684514 14.6176L4.91425 10.4188C5.30823 10.0276 5.30823 9.39048 4.91425 8.99938L0.426849 4.54471Z" fill="currentColor"/>
          </svg>
        `;
        this.element.append(this.input, this.button);
        this.container.append(this.element);
        this.parent = parent;
        this.input.addEventListener('input', (event) => this.handleInput(event));
        this.element.addEventListener('reset', (event) => this.handleReset(event));
    }

    handleInput = (event) => {
        const { target: { value } } = event;
        this.parent.taskList.filterTasks(value);
    }

    handleReset = () => {
        this.parent.taskList.filterTasks('');
    }
}

export default TaskFilter;