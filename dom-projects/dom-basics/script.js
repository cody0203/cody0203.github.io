"use strict";

// Một số biến và function đầu vào
//
//
let paragraphOne = document.getElementById("paragraph-one");
let paragraphTwo = document.getElementById("paragraph-two");
let paragraphThree = document.getElementById("paragraph-three");
let bodyHtml = document.getElementById("body");

// Các function để gọi lại font size của paragraphs
function recallFontSizePara(paragraphs) {
    let value = parseFloat(getComputedStyle(paragraphs).getPropertyValue("font-size"));
    if (value > 30) {
        paragraphs.style.fontSize = `30px`;
        value = parseFloat(getComputedStyle(paragraphs).getPropertyValue("font-size"));
    } else if (value < 10) {
        paragraphs.style.fontSize = `10px`;
        value = parseFloat(getComputedStyle(paragraphs).getPropertyValue("font-size"));
    }
};

// Main Function
//
//
// Đổi màu chữ của 3 đoạn văn theo thứ tự xanh, vàng, đỏ
let btnChangeParagraphsColor = document.getElementById("change-paragraph-color");

function changeParagraphsColor() {
    paragraphOne.style.color = "blue";
    paragraphTwo.style.color = "yellow";
    paragraphThree.style.color = "red";
}

btnChangeParagraphsColor.addEventListener("click", changeParagraphsColor)

// Thay đổi màu nền của trang thành màu color.
let btnChangeBgColor = document.getElementById("change-background-color")

function changeBgColor(color) {
    bodyHtml.style.backgroundColor = color;
}

btnChangeBgColor.addEventListener("click", () => { changeBgColor("pink"); }, false);

// Thay đổi nội dung của đoạn văn paragraph1 thành giống nội dung của đoạn văn paragraph2 (tham số truyền vào có thể là id của 2 đoạn văn).
let btnCopyContent = document.getElementById("copy-content");

function copyContent(paragraph1, paragraph2) {
    paragraph1.textContent = paragraph2.textContent;
}

btnCopyContent.addEventListener("click", () => { copyContent(paragraphOne, paragraphTwo); }, false)

// Thay đổi kích thước font chữ của cả 3 đoạn văn thành x pixels (x là một số nguyên).
let btnChangeFontSize = document.getElementById("change-font-size");

function changeFontSize(x) {
    paragraphOne.style.fontSize = `${x}px`;
    paragraphTwo.style.fontSize = `${x}px`;
    paragraphThree.style.fontSize = `${x}px`;
}

btnChangeFontSize.addEventListener("click", () => { changeFontSize(20); }, false)

// Tăng kích thước font chữ của đoạn văn mong muốn (paragraph, tham số truyền vào có thể là id đoạn văn) lên 1 pixel so với kích thước hiện tại, kích thước tăng lên không được vượt quá 30 pixels (Sử dụng sau khi gọi hàm changeFontSize() hoặc dùng window.getComputedStyle).
let btnIncreaseFontSize = document.getElementById("increase-font-size")

function increaseFontSize(paragraph) {
    let getParaOneFontSize = parseFloat(getComputedStyle(paragraphOne).getPropertyValue("font-size"));
    if (getParaOneFontSize < 30) {
        paragraph.style.fontSize = (++getParaOneFontSize) + "px";
    }
}

btnIncreaseFontSize.addEventListener("click", () => { increaseFontSize(paragraphOne); }, false)

//  Giảm kích thước font chữ của đoạn văn mong muốn (paragraph, tham số truyền vào có thể là id đoạn văn) xuống 1 pixels so với kích thước hiện tại, kích thước giảm xuống không vượt quá 10 pixels.
let btnDecreaseFontSize = document.getElementById("decrease-font-size")

function decreaseFontSize(paragraph) {
    let getParaTwoFontSize = parseFloat(getComputedStyle(paragraphTwo).getPropertyValue("font-size"));
    if (getParaTwoFontSize > 10) {
        paragraph.style.fontSize = (--getParaTwoFontSize) + "px";
    }
}

btnDecreaseFontSize.addEventListener("click", () => { decreaseFontSize(paragraphTwo); }, false)

// Optional Function
//
//
// Đổi màu chữ theo ý muốn
let inputChangeParaColorOptional = document.getElementById("change-paragraph-color-optional");
let btnParaOneColor = document.getElementById("btn-change-paragraph-color-optional-1")
let btnParaTwoColor = document.getElementById("btn-change-paragraph-color-optional-2")
let btnParaThreeColor = document.getElementById("btn-change-paragraph-color-optional-3")

function changeParaColorOptional(button) {
    switch (button) {
        case btnParaOneColor:
            paragraphOne.style.color = inputChangeParaColorOptional.value;
            break;
        case btnParaTwoColor:
            paragraphTwo.style.color = inputChangeParaColorOptional.value;
            break;
        case btnParaThreeColor:
            paragraphThree.style.color = inputChangeParaColorOptional.value;
            break;
    }
}

btnParaOneColor.addEventListener("click", () => { changeParaColorOptional(btnParaOneColor); }, false);
btnParaTwoColor.addEventListener("click", () => { changeParaColorOptional(btnParaTwoColor); }, false);
btnParaThreeColor.addEventListener("click", () => { changeParaColorOptional(btnParaThreeColor); }, false);

// Đổi màu background theo ý muốn
let inputChangeBgColorOptional = document.getElementById("change-bg-color-optional");
let btnChangeBgColorOptional = document.getElementById("btn-change-bg-color-optional");
function changeBgColorOptional() {
    bodyHtml.style.backgroundColor = inputChangeBgColorOptional.value;
}

btnChangeBgColorOptional.addEventListener("click", changeBgColorOptional);

// Copy đoạn văn theo ý muốn
let copyContentFrom = document.getElementById("copy-content-from");
let copyContentTo = document.getElementById("copy-content-to");
let btnCopyContentOptional = document.getElementById("btn-copy-content-optional");

function copyContentOptional() {
    document.getElementById(copyContentTo.value).textContent = document.getElementById(copyContentFrom.value).textContent;
}

btnCopyContentOptional.addEventListener("click", copyContentOptional)

// Thay đổi kích thước font chữ theo ý muốn 3 đoạn văn
let inputFontSizeOptional = document.getElementById("change-font-size-optional");
let btnFontSizeOptional = document.getElementById("btn-change-font-size-optional");

function changeFontSizeOptional(size) {
    paragraphOne.style.fontSize = `${size.value}px`;
    paragraphTwo.style.fontSize = `${size.value}px`;
    paragraphThree.style.fontSize = `${size.value}px`;
};

btnFontSizeOptional.addEventListener("click", () => { changeFontSizeOptional(inputFontSizeOptional); }, false)

// Tăng kích thước font chữ 1 đoạn văn theo ý muốn, kích thước tăng lên không được vượt quá 30 pixels
let inputIncreaseFontSizeOptional = document.getElementById("increase-font-size-optional");
let btnIncreaseParaOneFontSizeOption = document.getElementById("btn-increase-para-1-font-size-optional");
let btnIncreaseParaTwoFontSizeOption = document.getElementById("btn-increase-para-2-font-size-optional");
let btnIncreaseParaThreeFontSizeOption = document.getElementById("btn-increase-para-3-font-size-optional");

function increaseFontSizeOptional(button) {
    let getFontSizeParaOne = parseFloat(getComputedStyle(paragraphOne).getPropertyValue("font-size"));
    let getFontSizeParaTwo = parseFloat(getComputedStyle(paragraphTwo).getPropertyValue("font-size"));
    let getFontSizeParaThree = parseFloat(getComputedStyle(paragraphThree).getPropertyValue("font-size"));
    if (getFontSizeParaOne <= 30 || getFontSizeParaTwo <= 30 || getFontSizeParaThree <= 30) {
        switch (button) {
            case btnIncreaseParaOneFontSizeOption:
                paragraphOne.style.fontSize = `${getFontSizeParaOne += Number(inputIncreaseFontSizeOptional.value)}px`;
                recallFontSizePara(paragraphOne);
                break;
            case btnIncreaseParaTwoFontSizeOption:
                paragraphTwo.style.fontSize = `${getFontSizeParaTwo += Number(inputIncreaseFontSizeOptional.value)}px`;
                recallFontSizePara(paragraphTwo);
                break;
            case btnIncreaseParaThreeFontSizeOption:
                paragraphThree.style.fontSize = `${getFontSizeParaThree += Number(inputIncreaseFontSizeOptional.value)}px`;
                recallFontSizePara(paragraphThree);
                break;
        }
    }
}

btnIncreaseParaOneFontSizeOption.addEventListener("click", () => { increaseFontSizeOptional(btnIncreaseParaOneFontSizeOption); }, false)
btnIncreaseParaTwoFontSizeOption.addEventListener("click", () => { increaseFontSizeOptional(btnIncreaseParaTwoFontSizeOption); }, false)
btnIncreaseParaThreeFontSizeOption.addEventListener("click", () => { increaseFontSizeOptional(btnIncreaseParaThreeFontSizeOption); }, false)

// Giảm kích thước font chữ 1 đoạn văn theo ý muốn, kích thước giảm xuống không vượt quá 10 pixels
let inputDecreaseFontSizeOptional = document.getElementById("decrease-font-size-optional");
let btnDecreaseParaOneFontSizeOption = document.getElementById("btn-decrease-para-1-font-size-optional");
let btnDecreaseParaTwoFontSizeOption = document.getElementById("btn-decrease-para-2-font-size-optional");
let btnDecreaseParaThreeFontSizeOption = document.getElementById("btn-decrease-para-3-font-size-optional");

function decreaseFontSizeOptional(button) {
    let getFontSizeParaOne = parseFloat(getComputedStyle(paragraphOne).getPropertyValue("font-size"));
    let getFontSizeParaTwo = parseFloat(getComputedStyle(paragraphTwo).getPropertyValue("font-size"));
    let getFontSizeParaThree = parseFloat(getComputedStyle(paragraphThree).getPropertyValue("font-size"));

    switch (button) {
        case btnDecreaseParaOneFontSizeOption:
            paragraphOne.style.fontSize = `${getFontSizeParaOne -= Number(inputDecreaseFontSizeOptional.value)}px`;
            recallFontSizePara(paragraphOne);
            break;
        case btnDecreaseParaTwoFontSizeOption:
            paragraphTwo.style.fontSize = `${getFontSizeParaTwo -= Number(inputDecreaseFontSizeOptional.value)}px`;
            recallFontSizePara(paragraphTwo);
            break;
        case btnDecreaseParaThreeFontSizeOption:
            paragraphThree.style.fontSize = `${getFontSizeParaThree -= Number(inputDecreaseFontSizeOptional.value)}px`;
            recallFontSizePara(paragraphThree);
            break;
    }
}

btnDecreaseParaOneFontSizeOption.addEventListener("click", () => { decreaseFontSizeOptional(btnDecreaseParaOneFontSizeOption); }, false)
btnDecreaseParaTwoFontSizeOption.addEventListener("click", () => { decreaseFontSizeOptional(btnDecreaseParaTwoFontSizeOption); }, false)
btnDecreaseParaThreeFontSizeOption.addEventListener("click", () => { decreaseFontSizeOptional(btnDecreaseParaThreeFontSizeOption); }, false)