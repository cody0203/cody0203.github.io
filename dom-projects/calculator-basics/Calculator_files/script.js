"use strict";
let mainInput = $("#main-input");
let subInput = $("#sub-input");

function input(button) {
    mainInput.val(mainInput.val() + $(button).text());
}
//  == "+" || mainInput.val().substr(-1, 1) == "-" || mainInput.val().substr(-1, 1) == "x" || mainInput.val().substr(-1, 1) == "÷" || mainInput.val().substr(-1, 1) == "."
function operator(button) {
    if (mainInput.val() == "" || mainInput.val().substr(-1, 1).includes("+-*/.")) {
        $(button).stop();
    } else {
        mainInput.val(mainInput.val() + $(button).attr('id'));
    }
}

function calculator(button) {
    if (mainInput.val() == "") {
        $(button).stop();
    } else {
        subInput.val(mainInput.val());
        mainInput.val(eval(mainInput.val()));
    }
}