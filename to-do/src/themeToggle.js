import { getTheme, setTheme } from "./storage.js";

export class ThemeToggle {

    constructor(container) {
        this.element = document.createElement("button");
        this.element.id = "theme-toggle";
        container.appendChild(this.element);
        this.element.addEventListener("click", this.handleClick.bind(this));
        this.setInitialTheme();
    }

    setInitialTheme = () => {
        const currentTheme = getTheme();
        document.documentElement.setAttribute("data-theme", currentTheme);
        this.element.textContent = currentTheme === "dark" ? "Light" : "Dark";
    }

    handleClick = () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        this.element.textContent = newTheme === "dark" ? "Light" : "Dark";
        setTheme(newTheme);
    }
}