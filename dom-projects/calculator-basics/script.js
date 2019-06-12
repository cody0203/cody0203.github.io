"user strict";
// inputs
let buttons = document.getElementsByTagName("button");

let subInput = document.getElementById("sub-input")
let mainInput = document.getElementById("main-input")


// Specials
let squaredSpe = document.getElementById("squared");
let factorialSpe = document.getElementById("factorial");
let squareRootSpe = document.getElementById("square-root");
let sinSpe = document.getElementById("sin");
let cosSpe = document.getElementById("cos");
let tanSpe = document.getElementById("tan");
let logSpe = document.getElementById("log");
let lnSpe = document.getElementById("ln");

// Numbers
let numZero = document.getElementById("0");
let numDblZero = document.getElementById("00");
let numOne = document.getElementById("1");
let numTwo = document.getElementById("2");
let numThree = document.getElementById("3");
let numFour = document.getElementById("4");
let numFive = document.getElementById("5");
let numSix = document.getElementById("6");
let numSeven = document.getElementById("7");
let numEight = document.getElementById("8");
let numNine = document.getElementById("9");
let numPi = document.getElementById("pi");

// Operator
let leftParen = document.getElementById("(");
let rightParen = document.getElementById(")");
let clear = document.getElementById("clear");
let fullClear = document.getElementById("full-clear");
let modulus = document.getElementById("modulus");
let PosNeg = document.getElementById("pos-neg");
let theDot = document.getElementById("0");
let equalOpe = document.getElementById("=");
let plusOpe = document.getElementById("+");
let minusOpe = document.getElementById("-");
let multiplyOpe = document.getElementById("*");
let divideOpe = document.getElementById("/");

function resetMainInput() {
    mainInput.value = "";
}

clear.addEventListener("click", resetMainInput)

function resetAll() {
    resetMainInput();
    subInput.value = "";
}

fullClear.addEventListener("click", resetAll)

function render(button) {
    mainInput.value += button.id;
}

function checkMainInputValue() {
    if (mainInput.value === "") {
        equalOpe.disabled = true;
    } else {
        equalOpe.disabled = false;
    }
}
numFive.addEventListener("click", checkMainInputValue);

function cal(button) {
    if (button.id == "+") {
        subInput.value = eval(subInput.value + mainInput.value);
        mainInput.value = "";
    } else if (button.id == "-") {
        subInput.value = eval(subInput.value - mainInput.value);
        mainInput.value = "";
    } else if (button.id == "*") {
        subInput.value = eval(subInput.value * mainInput.value);
        mainInput.value = "";
    } else if (button.id == "*") {
        subInput.value = eval(subInput.value / mainInput.value);
        mainInput.value = "";
    }
}

equalOpe.addEventListener("click", () => { cal(plusOpe); }, false);

function mouseDownBtn(button) {
    button.style.backgroundColor = "#555";
    button.style.borderTop = "6px outset #5e5e5e";
    button.style.borderBottom = "6px outset #4d4d4d";
    button.style.color = "white";
}

function mouseUpBtn(button) {
    button.style.backgroundColor = "#fdf8e9";
    button.style.borderTop = "6px outset #fefdf9";
    button.style.borderBottom = "6px outset #fffcf4";
    button.style.color = "black";
}

function mouseDown() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("mousedown", () => { mouseDownBtn(buttons[i]); }, false)
    }
}

mouseDown();

function mouseUp() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("mouseup", () => { mouseUpBtn(buttons[i]); }, false)
    }
}

mouseUp();

// buttons.addEventListener("mousedown", () => { mouseDownBtn(this);}, false)
// buttons.addEventListener("mouseup", () => { mouseUpBtn(this); }, false)