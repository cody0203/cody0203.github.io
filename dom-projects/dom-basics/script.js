"use strict";

// Một số biến và function đầu vào
//
//
let paragraphOne = document.getElementById("paragraph-one");
let paragraphTwo = document.getElementById("paragraph-two");
let paragraphThree = document.getElementById("paragraph-three");
let getFontSizeParaOne = parseFloat(getComputedStyle(paragraphOne).getPropertyValue("font-size"));
let getFontSizeParaTwo = parseFloat(getComputedStyle(paragraphTwo).getPropertyValue("font-size"));
let getFontSizeParaThree = parseFloat(getComputedStyle(paragraphThree).getPropertyValue("font-size"));
let bodyHtml = document.getElementById("body");

// Các function để gọi lại size của paragraphs
function recallGetFontSizeParaOne() {
    if (getFontSizeParaOne > 30) {
        paragraphOne.style.fontSize = `30px`;
        getFontSizeParaOne = parseFloat(getComputedStyle(paragraphOne).getPropertyValue("font-size"));
    } else if (getFontSizeParaOne < 10) {
        paragraphOne.style.fontSize = `10px`;
        getFontSizeParaOne = parseFloat(getComputedStyle(paragraphOne).getPropertyValue("font-size"));
    }
};

function recallGetFontSizeParaTwo() {
    if (getFontSizeParaTwo > 30) {
        paragraphTwo.style.fontSize = `30px`;
        getFontSizeParaTwo = parseFloat(getComputedStyle(paragraphTwo).getPropertyValue("font-size"));
    } else if (getFontSizeParaTwo < 10) {
        paragraphTwo.style.fontSize = `10px`;
        getFontSizeParaTwo = parseFloat(getComputedStyle(paragraphTwo).getPropertyValue("font-size"));
    }
};

function recallGetFontSizeParaThree() {
    if (getFontSizeParaThree > 30) {
        paragraphThree.style.fontSize = `30px`;
        getFontSizeParaThree = parseFloat(getComputedStyle(paragraphThree).getPropertyValue("font-size"));
    } else if (getFontSizeParaThree < 10) {
        paragraphThree.style.fontSize = `10px`;
        getFontSizeParaThree = parseFloat(getComputedStyle(paragraphThree).getPropertyValue("font-size"));
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
    paragraphOne.style.fontSize = x;
    paragraphTwo.style.fontSize = x;
    paragraphThree.style.fontSize = x;
}

btnChangeFontSize.addEventListener("click", () => { changeFontSize("20px"); }, false)

// Tăng kích thước font chữ của đoạn văn mong muốn (paragraph, tham số truyền vào có thể là id đoạn văn) lên 1 pixel so với kích thước hiện tại, kích thước tăng lên không được vượt quá 30 pixels (Sử dụng sau khi gọi hàm changeFontSize() hoặc dùng window.getComputedStyle).
let btnIncreaseFontSize = document.getElementById("increase-font-size")

function increaseFontSize(paragraph) {
    if (getFontSizeParaOne < 30) {
        paragraph.style.fontSize = (++getFontSizeParaOne) + "px";
    }
}

btnIncreaseFontSize.addEventListener("click", () => { increaseFontSize(paragraphOne); }, false)

//  Giảm kích thước font chữ của đoạn văn mong muốn (paragraph, tham số truyền vào có thể là id đoạn văn) xuống 1 pixels so với kích thước hiện tại, kích thước giảm xuống không vượt quá 10 pixels.
let btnDecreaseFontSize = document.getElementById("decrease-font-size")

function decreaseFontSize(paragraph) {
    if (getFontSizeParaTwo > 10) {
        paragraph.style.fontSize = (--getFontSizeParaTwo) + "px";
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

function copyContentOptional(from, to) {
    if (from.value === "para-1" && to.value === "para-2") {
        paragraphTwo.textContent = paragraphOne.textContent
    } else if (from.value === "para-1" && to.value === "para-3") {
        paragraphThree.textContent = paragraphOne.textContent
    } else if (from.value === "para-2" && to.value === "para-1") {
        paragraphOne.textContent = paragraphTwo.textContent
    } else if (from.value === "para-2" && to.value === "para-3") {
        paragraphThree.textContent = paragraphTwo.textContent
    } else if (from.value === "para-3" && to.value === "para-1") {
        paragraphOne.textContent = paragraphThree.textContent
    } else if (from.value === "para-3" && to.value === "para-2") {
        paragraphTwo.textContent = paragraphThree.textContent
    }
}

btnCopyContentOptional.addEventListener("click", () => { copyContentOptional(copyContentFrom, copyContentTo); }, false)

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
    if (getFontSizeParaOne <= 30 || getFontSizeParaTwo <= 30 || getFontSizeParaThree <= 30) {
        switch (button) {
            case btnIncreaseParaOneFontSizeOption:
                paragraphOne.style.fontSize = `${getFontSizeParaOne += Number(inputIncreaseFontSizeOptional.value)}px`;
                recallGetFontSizeParaOne();
                break;
            case btnIncreaseParaTwoFontSizeOption:
                paragraphTwo.style.fontSize = `${getFontSizeParaTwo += Number(inputIncreaseFontSizeOptional.value)}px`;
                recallGetFontSizeParaTwo();
                break;
            case btnIncreaseParaThreeFontSizeOption:
                paragraphThree.style.fontSize = `${getFontSizeParaThree += Number(inputIncreaseFontSizeOptional.value)}px`;
                recallGetFontSizeParaThree();
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
    if (getFontSizeParaOne > 10 || getFontSizeParaTwo > 10 || getFontSizeParaThree > 10) {
        switch (button) {
            case btnDecreaseParaOneFontSizeOption:
                paragraphOne.style.fontSize = `${getFontSizeParaOne -= Number(inputDecreaseFontSizeOptional.value)}px`;
                recallGetFontSizeParaOne();
                break;
            case btnDecreaseParaTwoFontSizeOption:
                paragraphTwo.style.fontSize = `${getFontSizeParaTwo -= Number(inputDecreaseFontSizeOptional.value)}px`;
                recallGetFontSizeParaTwo();
                break;
            case btnDecreaseParaThreeFontSizeOption:
                paragraphThree.style.fontSize = `${getFontSizeParaThree -= Number(inputDecreaseFontSizeOptional.value)}px`;
                recallGetFontSizeParaThree();
                break;
        }
    }
}

btnDecreaseParaOneFontSizeOption.addEventListener("click", () => { decreaseFontSizeOptional(btnDecreaseParaOneFontSizeOption); }, false)
btnDecreaseParaTwoFontSizeOption.addEventListener("click", () => { decreaseFontSizeOptional(btnDecreaseParaTwoFontSizeOption); }, false)
btnDecreaseParaThreeFontSizeOption.addEventListener("click", () => { decreaseFontSizeOptional(btnDecreaseParaThreeFontSizeOption); }, false)