"use strict";

let paragraphOne = document.getElementById("paragraph-one");
let paragraphTwo = document.getElementById("paragraph-two");
let paragraphThree = document.getElementById("paragraph-three");
let bodyHtml = document.getElementById("body");
let btnChangeParagraphsColor = document.getElementById("change-color");
let btnCopyContent = document.getElementById("copy-content");
// Đổi màu chữ của 3 đoạn văn theo thứ tự xanh, vàng, đỏ

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

// btnChangeBgColor.addEventListener("click", changeBgColor("pink"));

// Thay đổi nội dung của đoạn văn paragraph1 thành giống nội dung của đoạn văn paragraph2 (tham số truyền vào có thể là id của 2 đoạn văn).

let paragraphOneContent = paragraphOne.textContent;

function copyContent(paragraph1, paragraph2) {
    paragraph1.textContent = paragraph2.textContent;
}

function turnBack(paragraph1) {
    paragraph1.textContent = paragraphOneContent;
}

// btnCopyContent.addEventListener("click", copyContent(paragraphOne, paragraphTwo))

// Thay đổi kích thước font chữ của cả 3 đoạn văn thành x pixels (x là một số nguyên).
function changeFontSize(x) {
    paragraphOne.style.fontSize = x;
    paragraphTwo.style.fontSize = x;
    paragraphThree.style.fontSize = x;
}

// Tăng kích thước font chữ của đoạn văn mong muốn (paragraph, tham số truyền vào có thể là id đoạn văn) lên 1 pixel so với kích thước hiện tại, kích thước tăng lên không được vượt quá 30 pixels (Sử dụng sau khi gọi hàm changeFontSize() hoặc dùng window.getComputedStyle).

function increaseFontSize(paragraph) {
    changeFontSize();
    let currentSize = parseFloat(paragraph.style.fontSize);
    if (currentSize < 30) {
        paragraph.style.fontSize = (++currentSize) + "px";
    }
}

//  Giảm kích thước font chữ của đoạn văn mong muốn (paragraph, tham số truyền vào có thể là id đoạn văn) xuống 1 pixels so với kích thước hiện tại, kích thước giảm xuống không vượt quá 10 pixels.

function decreaseFontSize(paragraph) {
    changeFontSize();
    let currentSize = parseFloat(paragraph.style.fontSize);
    if (currentSize > 10) {
        paragraph.style.fontSize = (--currentSize) + "px";
    }
}
