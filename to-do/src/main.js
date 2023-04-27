import TaskList from './taskList.js';
import TaskForm from './taskForm.js';
import TaskFilter from './taskFilter.js';
import SortButton from './sortButton.js';
import {TaskCounter} from './taskCounter.js';
import { ThemeToggle } from "./themeToggle.js";
import '../style.css'

class App {

    constructor(container) {
        this.container = container;
        this.container.insertAdjacentHTML(
            'beforeend',
            `<h1>To-do</h1>
            <div class="app-header"></div>
            <div class="app-body"></div>`
        );
        this.header = this.container.querySelector('.app-header');
        this.header.insertAdjacentHTML(
            'beforeend',
            `<div class="header-left"></div>
            <div class="header-right"></div>`
        );
        this.body = this.container.querySelector('.app-body');
        this.taskCounter = new TaskCounter(this.header);
        this.taskFilter = new TaskFilter(this.header, this);
        const themeToggle = new ThemeToggle(this.header);
        this.taskForm = new TaskForm(this.body, this);
        this.taskList = new TaskList(this.body, this.taskCounter);
        this.sortButton = new SortButton(this.header, this.taskList);
        this.taskCounter.updateTaskCounter(this.taskList);
        const headerLeft = this.header.querySelector('.header-left');
        const headerRight = this.header.querySelector('.header-right');
        headerLeft.append(this.sortButton.element);
        headerLeft.append(this.taskCounter.element);
        headerRight.append(this.taskFilter.element);
        headerRight.append(themeToggle.element);
    }
}

export default App;

const appContainer = document.getElementById('app');
const app = new App(appContainer);