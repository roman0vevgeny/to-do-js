import TaskItem from './taskItem.js';
import { getTasks, setTasks } from './storage.js';
import { compareByDate, compareByName, compareByStatus } from './helpers.js';

class TaskList {

    currentSort = {
        criteria: null,
        direction: 1,
    };

    constructor(container, taskCounter) {
        this.container = container;
        this.taskCounter = taskCounter;
        this.tasks = getTasks() || [];
        this.items = [];
        this.pageSize = 5;
        this.currentPage = 1;
        this.container.insertAdjacentHTML(
            'beforeend',
            `<ul class="task-list"></ul>
            <div class="pagination"></div>`
        );
        this.element = this.container.querySelector('.task-list');
        this.pagination = this.container.querySelector('.pagination');
        this.render();
        this.createPagination();
        this.sortTasks = this.sortTasks.bind(this);
    }

    addTask = (name) => {
        name = name.charAt(0).toUpperCase() + name.slice(1);
        const { tasks, pageSize } = this;
        const task = {
            id: Date.now(),
            name,
            completed: false,
            date: new Date().toISOString(),
        };
        tasks.unshift(task);
        setTasks(tasks);
        this.createPagination();
        const totalPages = Math.ceil(tasks.length / pageSize);
        if (this.currentPage > totalPages) {
            this.currentPage = totalPages;
        }
        this.render();
        this.updatePagination();
        this.taskCounter.updateTaskCounter(this);
    };

    deleteTask = (id) => {
        const { tasks, pageSize } = this;
        this.tasks = tasks.filter((task) => task.id !== id);
        setTasks(this.tasks);
        this.createPagination();
        const totalPages = Math.ceil(this.tasks.length / pageSize);
        if (this.currentPage > totalPages) {
            this.currentPage = totalPages;
        }
        if (this.tasks.length === 0) {
            this.currentPage = 1;
        }
        this.render();
        this.updatePagination();
        this.taskCounter.updateTaskCounter(this);
    };

    updateTask = (id, data) => {
        const { tasks } = this;
        const task = tasks.find((task) => task.id === id);
        if (!task) return;
        Object.assign(task, data);
        setTasks(tasks);
        this.createPagination();
        const totalPages = Math.ceil(this.tasks.length / this.pageSize);
        if (this.currentPage > totalPages) {
            this.currentPage = totalPages;
        }
        if (this.tasks.length === 0) {
            this.currentPage = 1;
        }
        this.render();
        this.updatePagination();
        this.taskCounter.updateTaskCounter(this);
    };

    sortTasks = (criteria) => {
        const { currentSort, tasks } = this;
        if (currentSort.criteria === criteria) {
            currentSort.direction = -currentSort.direction;
        } else {
            currentSort.criteria = criteria;
            currentSort.direction = 1;
        }
        const compareFunctions = {
            date: compareByDate,
            name: compareByName,
            status: compareByStatus,
        };
        const compareFunction = compareFunctions[criteria];
        if (!compareFunction) return;
        tasks.sort((a, b) => compareFunction(a, b) * currentSort.direction);
        this.render();
    };

    filterTasks = (text) => {
        const { tasks, element } = this;
        if (!text) {
            this.render();
            return;
        }
        const filteredTasks = tasks.filter((task) =>
            task.name.toLowerCase().includes(text.toLowerCase())
        );
        element.innerHTML = '';
        this.items = filteredTasks.map((task) => new TaskItem(task, this));
        this.items.forEach((item) => element.appendChild(item.element));
    };

    getPaginatedTasks = () => {
        const { currentPage, pageSize, tasks } = this;
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return tasks.slice(start, end);
    };

    createPagination = () => {
        const { tasks, pageSize} = this;
        if (!this.pagination) {
            this.pagination = document.createElement('div');
            this.pagination.className = 'pagination';
        }
        const totalPages = Math.ceil(tasks.length / pageSize);
        this.pagination.innerHTML = Array.from({ length: totalPages }, (_, i) =>
            `<button class="page-button">${i + 1}</button>`
        ).join('');
        const buttons = this.pagination.querySelectorAll('.page-button');
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                this.currentPage = +button.textContent;
                this.render();
                this.updatePagination();
            });
        });
        return this.pagination;
    };

    updatePagination() {
        const { pagination, currentPage } = this;
        pagination.querySelectorAll('.page-button').forEach(button => {
            button.classList.toggle('active', +button.textContent === currentPage);
        });
    }

    render() {
        this.element.innerHTML = '';
        const tasks = this.getPaginatedTasks();
        tasks.forEach((task) => {
            const item = new TaskItem(task, this);
            this.items.push(item);
            this.element.appendChild(item.element);
        });
    }
}

export default TaskList;
