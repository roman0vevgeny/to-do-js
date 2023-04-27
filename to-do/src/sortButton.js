import SortMenu from './sortMenu.js';

class SortButton {

    constructor(container, taskList) {
        this.container = container;
        this.taskList = taskList;
        this.element = document.createElement('button');
        this.element.textContent = 'Sort';
        this.element.className = 'sort-button';
        this.container.prepend(this.element);
        this.menu = new SortMenu(this, this.taskList);
        this.element.addEventListener('click', this.handleButtonClick.bind(this));
    }
    handleButtonClick = () => {
        this.menu.toggle();
    }
}

export default SortButton;