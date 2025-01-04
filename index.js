//Theme switch function
const themeToggleButton = document.querySelector("#theme-toggle");

let currentTheme = "light";
let style = window.getComputedStyle(document.body);
const lightColor = style.getPropertyValue("--light-mode-color");
const darkColor = style.getPropertyValue("--dark-mode-color");

themeToggleButton.addEventListener("click", (e) => {
    let icons = document.querySelectorAll(".icon");

    for (let i = 0; i < icons.length; i++) {
        icons[i].classList.toggle("svg-light");
    }

    let primaryColor = style.getPropertyValue("--primary-color");
    let secondaryColor = style.getPropertyValue("--secondary-color");
    document.documentElement.style.setProperty("--primary-color", secondaryColor);
    document.documentElement.style.setProperty("--secondary-color", primaryColor);

    currentTheme = (currentTheme) === "light" ? "dark" : "light";
    console.log(currentTheme);
});

//DisplayObject class
//Inputs are: div of .color-box
class DisplayObject {
    constructor(DOMObject) {
        this.DOMObject = DOMObject;
    }
}

//Add a new color box to the display
let boxList = [];

const contentBox = document.querySelector("#content");
const addBox = document.querySelector("#add-display");
const boxTemplate = document.querySelector("#display-template");

addBox.addEventListener("click", (e) => {
    let newBox = boxTemplate.content.cloneNode(true);

    if (currentTheme === "dark") {
        newBox.querySelectorAll(".icon").forEach((e) => {
            e.classList.toggle("svg-light");
        })
    }

    contentBox.appendChild(newBox);
    boxList.push(new DisplayObject(newBox));
})