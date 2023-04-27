const STORAGE_KEY = 'todo-app-tasks';
const THEME_KEY = 'todo-app-theme';

export const getTasks = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
}

export const setTasks = (tasks) => {
    const data = JSON.stringify(tasks);
    localStorage.setItem(STORAGE_KEY, data);
}

export const getTheme = () => {
    const theme = localStorage.getItem(THEME_KEY);
    return theme ? theme : 'light';
}

export const setTheme = (theme) => {
    localStorage.setItem(THEME_KEY, theme);
}