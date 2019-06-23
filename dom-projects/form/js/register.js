// Register validated

let registerForm = document.getElementById("register-form");
let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let registerEmail = document.getElementById("register-email");
let phoneNumber = document.querySelector("#phone-number");
let registerPassword = document.querySelector("#register-password");

registerForm.addEventListener("submit", registerValidate);
registerPassword.addEventListener("keyup", checkPassword);

firstName.addEventListener("focusin", () => {
    appearErrorMessage(checkFirstName(), firstName);
});
firstName.addEventListener("focusout", () => {
    disappearErrorMessage(checkFirstName(), firstName);
});

lastName.addEventListener("focusin", () => {
    appearErrorMessage(checkLastName(), lastName);
});
lastName.addEventListener("focusout", () => {
    disappearErrorMessage(checkLastName(), lastName);
});

registerEmail.addEventListener("focusin", () => {
    appearErrorMessage(checkEmail(), registerEmail);
});
registerEmail.addEventListener("focusout", () => {
    disappearErrorMessage(checkEmail(), registerEmail);
});

phoneNumber.addEventListener("focusin", () => {
    appearErrorMessage(checkPhoneNumber(), phoneNumber);
});
phoneNumber.addEventListener("focusout", () => {
    disappearErrorMessage(checkPhoneNumber(), phoneNumber);
});

registerPassword.addEventListener("focusin", () => {
    appearErrorMessage(checkPassword(), registerPassword);
});
registerPassword.addEventListener("focusout", () => {
    disappearErrorMessage(checkPassword(), registerPassword);
});

function addClass(classes, ...elements) {
    for (let element of elements) {
        element.classList.add(classes);
        if (element.classList.contains("first")) {
            element.nextElementSibling.style.visibility = "visible";
        }
    }
}

function removeClass(classes, ...elements) {
    for (let element of elements) {
        element.classList.remove(classes);
    }
}

function registerValidate(event) {
    let isValid = true;
    firstName.focus();
    
    addClass("show-error", firstName, lastName, phoneNumber, registerPassword, registerEmail);

    checkFirstName();
    checkLastName();
    checkEmail();
    checkPhoneNumber();
    checkPassword();

    if (checkFirstName() == false ||
        checkLastName() == false ||
        checkEmail() == false ||
        checkPhoneNumber() == false ||
        checkPassword() == false) {
        event.preventDefault();
    }

    return isValid;
}

function invalidDataShow(element) {
    element.nextElementSibling.style.animation = "appear 0.5s ease both";
    if (element !== document.activeElement) {
        element.style.borderColor = "#bc5461";
    }
}

function validDataShow(element) {
    element.nextElementSibling.style.animation = "style", "disappear 0.5s ease both";
    element.nextElementSibling.textContent = "";
    element.nextElementSibling.style.visibility = "hidden";
    element.style.borderColor = "";
}

function disappearErrorMessage(func, element) {
    validDataShow(element);
    element.style.borderColor = "#bc5461";
    if (func) {
        element.style.borderColor = "";
    }
    element.classList.add("show-error");
}

function appearErrorMessage(func, element) {
    invalidDataShow(element);
    element.style.borderColor = "";
    switch (element.id) {
        case "register-email":
            element.nextElementSibling.textContent = "Email is invalid";
            break;
        case "register-password":
            element.nextElementSibling.innerHTML = "Password length 8 - 15 characters, at least one uppercase letter, one lowercase letter, one&nbsp;number, one special character, space is not&nbsp;allowed";
            break;
        case "first-name":
            element.nextElementSibling.textContent = "First name is required";
            break;
        case "last-name":
            element.nextElementSibling.textContent = "Last name is required";
            break;
        case "phone-number":
            element.nextElementSibling.textContent = "Phone number is invalid";
            break;
    }
    if (func) {
        validDataShow(element);
    }
    if (element.classList.contains("show-error")) {
        element.nextElementSibling.style.visibility = "visible";
    }
}

function checkFirstName() {
    let isValid = true;
    if (firstName.value === "") {
        invalidDataShow(firstName);
        isValid = false;
    } else {
        validDataShow(firstName);
        removeClass("show-error", firstName);
    }
    return isValid;
}

function checkLastName() {
    let isValid = true;
    if (lastName.value === "") {
        invalidDataShow(lastName);
        isValid = false;
    } else {
        validDataShow(lastName);
        removeClass("show-error", lastName);
    }
    return isValid;
}

function checkEmail() {
    let isValid = true;
    if (registerEmail.value.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/) === null)

    // Email validator that adheres directly to the specification for email address naming. It allows for everything from ipaddress and country-code domains, to very rare characters in the username.

    {
        invalidDataShow(registerEmail);
        isValid = false;
    } else {
        validDataShow(registerEmail);
        removeClass("show-error", registerEmail);
    }
    return isValid;
}

function checkPhoneNumber() {
    let isValid = true;
    if (phoneNumber.value.match(/((09|03|07|08|05)+([0-9]{8})\b)/g) === null) {
        invalidDataShow(phoneNumber);
        isValid = false;
    } else {
        validDataShow(phoneNumber);
        removeClass("show-error", phoneNumber);
    }
    return isValid;
}

function checkPassword() {
    let isValid = true;
    if (registerPassword.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/) === null)

    // Strong passwords with min 8 - max 15 character length, at least one uppercase letter, one lowercase letter, one number, one special character (all, not just defined), space is not allowed.

    {
        invalidDataShow(registerPassword);
        isValid = false;
    } else {
        validDataShow(registerPassword);
        removeClass("show-error", registerPassword);
    }
    return isValid;
}

// Fill Birth Day

let days = document.querySelector("#day");
let now = new Date();

function fillDay() {
    let value = 0;
    let option;
    for (let day = 31; day >= 1; day--) {
        value = day;
        option = document.createElement("option");
        option.setAttribute("value", value);
        option.textContent = value;
        days.appendChild(option);
    }
}
fillDay();

let months = document.querySelector("#month");

function fillMonth() {
    let value = 0;
    let option;
    for (let month = 1; month <= 12; month++) {
        value = month;
        option = document.createElement("option");
        option.setAttribute("value", value);
        option.textContent = value;
        months.appendChild(option);
    }
};
fillMonth();

let years = document.querySelector("#year");

function fillYear() {
    let value = 0;
    let option;
    for (let year = now.getFullYear(); year >= 1905; year--) {
        value = year;
        option = document.createElement("option");
        option.setAttribute("value", value);
        option.textContent = value;
        years.appendChild(option);
    }
};
fillYear();

// function selectedDay() {
//     let dayArray = days.children;
//     for (let day in dayArray) {
//         if (dayArray[day].value == now.getDate()) {
//             dayArray[day].setAttribute("selected", "selected");
//         }
//     }
// }

// selectedDay();

// function selectedMonth() {
//     let monthArray = months.children;
//     for (let month in monthArray) {
//         if (monthArray[month].value == now.getMonth()) {
//             monthArray[month].setAttribute("selected", "selected");
//         }
//     }
// }

// selectedMonth();

// function selectedYear() {
//     let yearArray = years.children;
//     for (let year in yearArray) {
//         if (yearArray[year].value == "1995") {
//             yearArray[year].setAttribute("selected", "selected");
//         }
//     }
// }

// selectedYear();