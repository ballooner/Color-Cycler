//Verify if a string is a valid hex code
//String -> Boolean
//True if valid, false otherwise
function verifyHex(hexCode) {
    let regex = /^#[0-9A-F]{6}$/i;

    return regex.test(hexCode);
}

//Increase a hex color by input amounts
//String(hex), int, int, int -> String(hex)
function increaseHex(currentColor, rIncrease, gIncrease, bIncrease) {
    let red = (parseInt(currentColor.slice(1, 3), 16) + rIncrease) % 255;
    let green = (parseInt(currentColor.slice(3, 5), 16) + gIncrease) % 255;
    let blue = (parseInt(currentColor.slice(5), 16) + bIncrease) % 255;

    let finalHex = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`

    return finalHex;
}

//Theme switch variables
const themeToggleButton = document.querySelector("#theme-toggle");

let currentTheme = "light";
let style = window.getComputedStyle(document.body);
const lightColor = style.getPropertyValue("--light-mode-color");
const darkColor = style.getPropertyValue("--dark-mode-color");

//Theme switch function
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
});

//DisplayObject class
//Inputs are: DOM element
//            Div of box
class DisplayObject {
    #rIncrease = 0;
    #gIncrease = 0;
    #bIncrease = 0;
    #intervalMS = 250;

    constructor(DOMObject) {
        this.DOMObject = DOMObject;
    }

    //String as hexadecimal color
    setColor(hexColor) {
        this.color = hexColor;
        this.DOMObject.style.backgroundColor = hexColor;
    }

    getColor() {
        return this.color;
    }

    setRIncrease(rIncrease) {
        this.rIncrease = rIncrease;
    }

    getRIncrease() {
        return this.rIncrease;
    }
    
    setGIncrease(gIncrease) {
        this.gIncrease = gIncrease;
    }

    getGIncrease() {
        return this.gIncrease;
    }
    
    setBIncrease(bIncrease) {
        this.bIncrease = bIncrease;
    }

    getBIncrease() {
        return this.bIncrease;
    }

    cycleColor() {
        let newColor = increaseHex(this.color, this.rIncrease, this.gIncrease, this.bIncrease);

        this.setColor(newColor);
    }
}

//Add a new color box to the display
let boxList = [];

const contentBox = document.querySelector("#content");
const addBox = document.querySelector("#add-display");
const boxTemplate = document.querySelector("#display-template");
const popup = document.querySelector("#popup")

addBox.addEventListener("click", (e) => {
    let newBox = boxTemplate.content.cloneNode(true);

    if (currentTheme === "dark") {
        newBox.querySelectorAll(".icon").forEach((e) => {
            e.classList.toggle("svg-light");
        })
    }

    contentBox.appendChild(newBox);
    boxList.push(new DisplayObject(newBox));
    console.log(newBox);

    //Get box class inputs
    let color;
    let rIncrease;
    let gIncrease; 
    let bIncrease;

    popup.classList.toggle("invisible");

    //Disable buttons while popup is displayed
    document.querySelectorAll("button").forEach((e) => (e.disabled = true));

    popup.addEventListener("submit", (e) => {
        e.preventDefault();

        color = e.target.querySelector("#colorInput").value;
        rIncrease = e.target.querySelector("#rInput").value;
        gIncrease = e.target.querySelector("#gInput").value;
        bIncrease = e.target.querySelector("#bInput").value;

        popup.classList.toggle("invisible");

        boxList[boxList.length - 1].setColor(color);

        document.querySelectorAll("button").forEach((e) => (e.disabled = false));
    });
})

