//Theme switch function
const themeToggleButton = document.querySelector("#theme-toggle");

let style = window.getComputedStyle(document.body);
const lightColor = style.getPropertyValue("--light-mode-color");
const darkColor = style.getPropertyValue("--dark-mode-color");

//Match the website theme to computer's chosen theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.style.setProperty("--primary-color", darkColor);
    document.documentElement.style.setProperty("--secondary-color", lightColor);

    let icons = document.querySelectorAll(".icon");

    for (let i = 0; i < icons.length; i++) {
        icons[i].classList.add("svg-light");
    }
}

themeToggleButton.addEventListener("click", (e) => {
    let icons = document.querySelectorAll(".icon");

    for (let i = 0; i < icons.length; i++) {
        icons[i].classList.toggle("svg-light");
    }

    let primaryColor = style.getPropertyValue("--primary-color");
    let secondaryColor = style.getPropertyValue("--secondary-color");
    document.documentElement.style.setProperty("--primary-color", secondaryColor);
    document.documentElement.style.setProperty("--secondary-color", primaryColor);
});