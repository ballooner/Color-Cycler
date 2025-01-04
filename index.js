//Theme switch function
const themeToggleButton = document.querySelector("#theme-toggle");
let currentTheme = "light";

let style = window.getComputedStyle(document.body);
let lightColor = style.getPropertyValue("--light-mode-color");
let darkColor = style.getPropertyValue("--dark-mode-color");

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.style.setProperty("--current-theme-color", darkColor);
    document.documentElement.style.setProperty("--current-secondary-color", lightColor);
}