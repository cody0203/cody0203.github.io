let mainInput = $("#main-input").val(" ");
let subInput = $("#sub-input");


// Function input số từ 1 -> 9
// Với các điều kiện để nếu nhập tiếp là số thì sẽ xoá val() của mainInput đi
// Nếu nhập tiếp là toán tử thì sẽ giữ lại val() hiện tại của mainInput để thực hiện tiếp phép tính
// Em đang bị bug ở nếu val() của mainInput là số âm thì nó nếu nhập tiếp là số nó chỉ nhập được 1 số 1 lần
//
//
//  else if (subResult.includes("-") && mainResult.includes("-")) {
//     subInput.val(`Ans: ${eval(newSubResult)}`);
//     mainInput.val(" ");
//     mainInput.val($(button).text());
// } 
function input(button) {
    let theDot = $(".dot");
    let operator = $(".operator");
    let mainResult = mainInput.val();
    let newMainResult = mainResult.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/, "-");
    let subResult = subInput.val();
    let newSubResult = subResult.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/, "-");
    // if (checkArrElementInInput(mainInput, operator) == false && checkArrElementInInput(subInput, operator)) {
    //     subInput.val(`Ans: ${eval(newSubResult)}`);
    //     mainInput.val(" ");
    //     mainInput.val($(button).text());
    // } else if (subResult.includes("-") && mainResult.includes("-")) {
    //     subInput.val(`Ans: ${eval(newSubResult)}`);
    //     mainInput.val(" ");
    //     mainInput.val($(button).text());
    // } else if (checkElementInLastInInput(mainInput, operator)) {
    //     mainInput.val(mainResult + $(button).text());
    // } else {
    //     mainInput.val(mainResult + $(button).text()); 
    // }
    mainInput.val(mainInput.val() + $(button).text());
    if (checkArrElementInInput(mainInput, operator) == false && checkArrElementInInput(subInput, operator)) {
        subInput.val(`Ans: ${eval(newSubResult)}`);
        mainInput.val("");
        mainInput.val(mainInput.val() + $(button).text());
    } else if (subResult.includes("-") && mainResult.includes("-") && checkArrElementInInput(mainInput, operator) == false) {
        subInput.val(`Ans: ${eval(newSubResult)}`);
        mainInput.val("");
        mainInput.val(mainInput.val() + $(button).text());
    } else if (checkArrElementInInput(subInput, theDot) && checkArrElementInInput(mainInput, theDot) && checkArrElementInInput(mainInput, operator) == false) {
        subInput.val(`Ans: ${eval(newSubResult)}`);
        mainInput.val("");
        mainInput.val(mainInput.val() + $(button).text());
    }
}

function removeSpace(input) {
    input.val(input.val().replace(" ", ""));
}

function checkArrElementInInput(input, arr) {
    let elementItem = $(arr).text();
    for (let i = 0; i < elementItem.length; i++) {
        if (input.val().includes(elementItem[i])) {
            return true;
        }
    }
    return false;
}

function checkLastIndex(input, arr) {
    let elementItem = $(arr).text().split("");
    let result = [];
    for (let i = 0; i < elementItem.length; i++) {
        result.push(input.val().lastIndexOf(elementItem[i]));
    }
    return result.reduce((a, b) => Math.max(a, b));
}

function checkElementInInput(input, element) {
    let elementItem = $(element).text();
    if (input.val().includes(elementItem)) {
        return true;
    } else {
        return false;
    }
}

function checkElementInLastInInput(input, element) {
    let elementItem = $(element).text();
    if (
        input
            .val()
            .substr(-1, 1)
            .includes(elementItem)
    ) {
        return true;
    } else {
        return false;
    }
}

function checkArrElementInLastInput(input, element) {
    let elementItem = $(element).text();
    if (elementItem.includes(input.val().substr(-1, 1))) {
        return true;
    } else {
        return false;
    }
}

function checkArrElementInFirstInput(input, element) {
    let elementItem = $(element).text();
    if (elementItem.includes(input.val().substr(0))) {
        return true;
    } else {
        return false;
    }
}

function calculator(button) {
    removeSpace(mainInput);
    let operator = $(".operator");
    let parensLeft = $("#paren-l");
    let lastItem = checkLastIndex(mainInput, operator);
    let inputValToArray = mainInput.val().split("");
    let checkCal = inputValToArray.splice(lastItem, 1);
    if (mainInput.val() == "" && $(button).attr("id") !== "-") {
        mainInput.val(0 + $(button).text());
    } else if (mainInput.val() == "" && $(button).attr("id") == "-"){
        mainInput.val("-");
    } else if (operator.text().includes(checkCal) && checkArrElementInLastInput(mainInput, operator)) {
        mainInput.val(inputValToArray.join("") + $(button).text());
    } else if (
        checkArrElementInLastInput(mainInput, parensLeft))
        {
        $(button).stop();
    } else {
        input(button);
    }
}



function dot(button) {
    removeSpace(mainInput);
    let theDot = $(".dot");
    let lastDot = checkLastIndex(mainInput, theDot);
    let inputDotValToArray = mainInput.val().split("");
    let checkDot = inputDotValToArray.splice(lastDot + 1);
    let operator = $(".operator");
    let lastOperator = checkLastIndex(mainInput, operator);
    let checkOperator = inputDotValToArray.splice(lastOperator);
    if (inputDotValToArray.join("").includes(theDot.text()) && checkDot.join("").includes(theDot.text())) {
        $(button).stop;
    } else if (checkOperator.join("").includes(theDot.text()) == false && checkDot.join("").includes(theDot.text()) == false) {
        input(button);
    }
}

function pi(button) {
    let operator = $(".operator");
    removeSpace(mainInput);
    if (mainInput.val() == " " || checkArrElementInLastInput(mainInput, operator)) {
        mainInput.val(mainInput.val() + Math.PI);
        subInput.val(` Ans: ${mainInput.val()}`);
    } else {
        $(button).stop();
    }
}

function e(button) {
    let operator = $(".operator");
    removeSpace(mainInput);
    if (mainInput.val() == "" || checkArrElementInLastInput(mainInput, operator)) {
        mainInput.val(mainInput.val() + Math.E);
        subInput.val(` Ans: ${mainInput.val()}`);
    } else {
        $(button).stop();
    }
}

function percent() {
    removeSpace(mainInput);
    let operator = $(".operator");
    let lastItem = checkLastIndex(mainInput, operator);
    let inputValToArray = mainInput.val().split("");
    if (lastItem == -1) {
        mainInput.val(mainInput.val() / 100);
        subInput.val(` Ans: ${mainInput.val()}`);
    } else {
        let percentItem = inputValToArray.splice(lastItem + 1).join("");
        mainInput.val(inputValToArray.join("") + (percentItem / 100));
    }
}

function factorial(button) {
    removeSpace(mainInput);
    let operator = $(".operator");
    let lastItem = checkLastIndex(mainInput, operator);
    let inputValToArray = mainInput.val().split("");
    let factorialItem = inputValToArray.splice(lastItem + 1).join("");
    if (mainInput.val() == "" || checkArrElementInLastInput(mainInput, operator)) {
        $(button).stop();
    } else {
        let num = 1;
        for (let i = 2; i <= factorialItem; i++) {
            num = num * i;
        }
        mainInput.val(inputValToArray.join("") + num);
        subInput.val(` Ans: ${mainInput.val()}`);
    }
};

function squared(button) {
    let operator = $(".operator");
    let mathPow = `Math.pow(`;
    if (mainInput.val().includes(mathPow) || mainInput.val() == " " || checkArrElementInLastInput(mainInput, operator)) {
        $(button).stop();
    } else {
        removeSpace(mainInput);
        mainInput.val(`${mathPow}${mainInput.val()},`);
    }
}

function squareRoot(button) {
    let operator = $(".operator");
    let lastItem = checkLastIndex(mainInput, operator);
    let inputValToArray = mainInput.val().split("");
    let squareRootItem = inputValToArray.splice(lastItem + 1).join("");
    if (mainInput.val() == " " || checkArrElementInLastInput(mainInput, operator)) {
        $(button).stop();
    } else {
        removeSpace(mainInput);
        mainInput.val(inputValToArray.join("") + Math.sqrt(squareRootItem));
        subInput.val(` Ans: ${mainInput.val()}`);
    }
}

function log(button) {
    let operator = $(".operator");
    let lastItem = checkLastIndex(mainInput, operator);
    let inputValToArray = mainInput.val().split("");
    let squareRootItem = inputValToArray.splice(lastItem + 1).join("");
    if (mainInput.val() == " " || checkArrElementInLastInput(mainInput, operator)) {
        $(button).stop();
    } else {
        removeSpace(mainInput);
        mainInput.val(inputValToArray.join("") + Math.log(squareRootItem));
        subInput.val(` Ans: ${mainInput.val()}`);
    }
}

function exp(button) {
    let operator = $(".operator");
    let lastItem = checkLastIndex(mainInput, operator);
    let inputValToArray = mainInput.val().split("");
    let expItem = inputValToArray.splice(lastItem + 1).join("");
    if (mainInput.val() == " " || checkArrElementInLastInput(mainInput, operator)) {
        $(button).stop();
    } else {
        removeSpace(mainInput);
        mainInput.val(inputValToArray.join("") + Math.exp(expItem));
        subInput.val(` Ans: ${mainInput.val()}`);
    }
}

function sin(button) {
    removeSpace(mainInput);
    let operator = $(".operator");
    let lastItem = checkLastIndex(mainInput, operator);
    let inputValToArray = mainInput.val().split("");
    let items = inputValToArray.splice(lastItem + 1).join("");
    if (mainInput.val() == " " || checkArrElementInLastInput(mainInput, operator)) {
        $(button).stop();
    } else if ($(button).attr("id") == "sin") {
        mainInput.val(inputValToArray.join("") + Math.sin(items));
        subInput.val(` Ans: ${mainInput.val()}`);
    }
}

function cos(button) {
    removeSpace(mainInput);
    let operator = $(".operator");
    let lastItem = checkLastIndex(mainInput, operator);
    let inputValToArray = mainInput.val().split("");
    let items = inputValToArray.splice(lastItem + 1).join("");
    if (mainInput.val() == " " || checkArrElementInLastInput(mainInput, operator)) {
        $(button).stop();
    } else if ($(button).attr("id") == "cos") {
        mainInput.val(inputValToArray.join("") + Math.cos(items));
        subInput.val(` Ans: ${mainInput.val()}`);
    }
}

function tan(button) {
    removeSpace(mainInput);
    let operator = $(".operator");
    let lastItem = checkLastIndex(mainInput, operator);
    let inputValToArray = mainInput.val().split("");
    let items = inputValToArray.splice(lastItem + 1).join("");
    if (mainInput.val() == " " || checkArrElementInLastInput(mainInput, operator)) {
        $(button).stop();
    } else if ($(button).attr("id") == "tan") {
        mainInput.val(inputValToArray.join("") + Math.tan(items));
        subInput.val(` Ans: ${mainInput.val()} `);
    }
}
let history = [];

function equal(button) {
    let mathPow = `Math.pow(`;
    let operator = $(".operator");
    let mainResult = mainInput.val();
    let newMainResult = mainResult.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/, "-");
    let subResult = subInput.val();
    if (
        mainResult == "" ||
        checkArrElementInLastInput(mainInput, operator)
    ) {
        $(button).stop();
    } else if (checkArrElementInInput(mainInput, operator) == false && mainResult.includes(mathPow) == false) {
        subInput.val(subResult);
    } else if (mainResult.includes(mathPow)) {
        mainInput.val(newMainResult + ")");
        subInput.val(` Ans: ${newMainResult})`);
        mainInput.val(eval(mainInput.val()));
        history.push(mainInput.val());
    } else {
        subInput.val(`Ans: ${mainResult}`);
        mainInput.val(eval(newMainResult));
        history.push(mainInput.val());
    }
}



let btnClear = $("#clear");

function clear() {
    let operator = $(".operator");
    let dot = $("#dot");
    if (checkArrElementInInput(mainInput, operator) && checkElementInInput(mainInput, dot) || subInput.val() == "") {
        mainInput.val(" ");
    } else if (mainInput.val() == " ") {
        btnClear.stop();
    } else {
        subInput.val(`Ans: ${eval(mainInput.val())}`);
        mainInput.val(" ");
    }
}

btnClear.click(clear);

let btnFullClear = $("#full-clear");

function fullClear() {
    mainInput.val(" ");
    subInput.val("");
}

btnFullClear.click(fullClear);

function ansBtn(button) {
    if (subInput.val() == "") {
        $(button).stop();
    } else {
        input(button);
        mainInput.val(eval(subInput.val()));
        subInput.val(`Ans: ${eval(mainInput.val())}`);
    }
}

function parens1(button) {
    let parensRight = $("#paren-r");
    let parensLeft = $("#paren-l");
    let number = $(".numbers");

    if (
        checkElementInLastInInput(mainInput, parensRight) ||
        checkElementInLastInInput(mainInput, parensLeft) ||
        checkArrElementInLastInput(mainInput, number)
    ) {
        $(button).stop();
    } else {
        input(button);
    }
}

function parens2(button) {
    let parensRight = $("#paren-r");
    let parensLeft = $("#paren-l");
    let operator = $(".operator");

    if (
        checkArrElementInInput(mainInput, parensLeft) == false ||
        checkElementInLastInInput(mainInput, parensLeft) ||
        checkElementInLastInInput(mainInput, parensRight) ||
        checkArrElementInLastInput(mainInput, operator)
    ) {
        $(button).stop();
    } else {
        input(button);
    }
}

$("button").on("mousedown", function () {
    $(this).css({
        "transform": "scale(1.1)",
    });
}).on("mouseup", function () {
    $(this).css({
        "transform": "scale(1)",
    });
})

$("#change-theme").on("click", function () {
    let themeNumber = Number($('link').attr('href').substr($('link').attr('href').search(".css") - 1, 1));
    if (themeNumber < 2) {
        ++themeNumber;
    } else {
        themeNumber = 1;
    }
    $('link').attr('href', "style" + themeNumber + ".css");

})