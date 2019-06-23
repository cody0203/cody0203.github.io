let url = location.search;
url = decodeURIComponent(url);
let strInfo = url.slice(1).split("&");
strInfo.pop();

function findingInfo(arrInfo, values) {
    let value = "";
    let arr = [];
    for (let info of arrInfo) {
        if (info.match(values) && info.includes("+") == false) {
            value = info.slice(info.search(/=/) + 1);
        } else if (info.match(values) && info.includes("+")) {
            value = info.slice(info.search(/=/) + 1).replace(/\+/g, " ");
            let upperValue = value.toLowerCase().split(" ")
            for (let char of upperValue) {
                arr.push(char.replace(char[0], char[0].toUpperCase()));
            }
            value = arr.join(" ");
        }
    }
    return value;
}

findingInfo(strInfo, "email");

let phoneNumber = document.querySelector("#phone-number");
phoneNumber.textContent = findingInfo(strInfo, "phone-number");

let firstName = document.querySelector("#first-name");
firstName.textContent = findingInfo(strInfo, "first-name");

let lastName = document.querySelector("#last-name");
lastName.textContent = findingInfo(strInfo, "last-name");

let email = document.querySelector("#email");
email.textContent = findingInfo(strInfo, "email");

let password = document.querySelector("#password");
password.textContent = findingInfo(strInfo, "password");

let gender = document.querySelector("#gender");
gender.textContent = findingInfo(strInfo, "gender");

let birthDay = document.querySelector("#birth-day");
// birthDay.textContent = `${findingInfo(strInfo, "day")}/${findingInfo(strInfo, "month")}/${findingInfo(strInfo, "year")}`;

function birthDayDisplay(...funcs) {
    for (let func of funcs) {
        let date = "";
        date += func;
        if (date.includes(func) && func!== "") {
            birthDay.textContent += `${func}/`;
        }
    }
    if (birthDay.textContent.endsWith("/")) {
        birthDay.textContent = birthDay.textContent.slice(0, -1);
    }
}

birthDayDisplay(findingInfo(strInfo, "day"), findingInfo(strInfo, "month"), findingInfo(strInfo, "year"));