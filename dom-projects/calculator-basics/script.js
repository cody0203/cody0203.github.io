"user strict";
// inputs
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

function render(button) {
    mainInput.value += button.id;
}

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

equalOpe.addEventListener("click", () => { cal(plusOpe);}, false)