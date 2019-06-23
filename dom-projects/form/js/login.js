// Login validated

let loginForm = document.querySelector("#login-form");
let hideShowPass = document.querySelector("#hide-show-password");
let loginEmail = document.querySelector("#login-email");
let loginPassword = document.querySelector("#login-password");
let error = document.querySelectorAll(".error");
let passwordWrap = document.querySelector("#input-password");

loginForm.addEventListener("submit", loginValidate);

loginEmail.addEventListener("focusin", () => {
    appearErrorMessage(checkEmail(), loginEmail);
}); 

loginEmail.addEventListener("focusout", () => {
    disappearErrorMessage(checkEmail(), loginEmail);
});

loginPassword.addEventListener("focusin", () => {
    appearErrorMessage(checkPassword(), loginPassword);
});

loginPassword.addEventListener("focusout", () => {
    disappearErrorMessage(checkPassword(), loginPassword);
});

function addClass(classes, ...elements) {
    for (let element of elements) {
        element.classList.add(classes);
        if (element.classList.contains("first")) {
            element.parentNode.nextElementSibling.style.visibility = "visible";
        }
    }
}

function removeClass(classes, ...elements) {
    for (let element of elements) {
        element.classList.remove(classes);
    }
}

function loginValidate(event) {
    let isValid = true;
    checkEmail();
    checkPassword();
    loginEmail.focus();

    addClass("show-error", loginEmail, loginPassword);

    if (checkEmail() == false || checkPassword() == false) {
        event.preventDefault();
    }
    return isValid;
}

function invalidDataShow(element) {
    element.parentNode.nextElementSibling.style.animation = "appear 0.5s ease both";
    if (element !== document.activeElement && element.classList.contains("have-sibling")) {
        element.style.borderColor = "#bc5461";
        element.nextElementSibling.style.borderColor = "#bc5461";
    }
}

function validDataShow(element) {
    element.parentNode.nextElementSibling.style.animation = "disappear 0.5s ease both";
    element.parentNode.nextElementSibling.textContent = "";
    element.parentNode.nextElementSibling.style.visibility = "hidden";
    element.style.borderColor = "";
    if (element.classList.contains("have-sibling")) {
        element.nextElementSibling.style.borderColor = "";
    }
}

function disappearErrorMessage(func, element) {
    validDataShow(element);
    element.style.borderColor = "#bc5461";
    if (element.classList.contains("have-sibling")) {
        element.nextElementSibling.style.borderColor = "#bc5461";
    }
    if (func) {
        element.style.borderColor = "";
        if (element.classList.contains("have-sibling")) {
            element.nextElementSibling.style.borderColor = "";
        }
    }
    element.classList.add("show-error");
}

function appearErrorMessage(func, element) {
    invalidDataShow(element);
    switch (element.id) {
        case "login-email":
            element.parentNode.nextElementSibling.textContent = "Email is invalid";
            break;
        case "login-password":
            element.parentNode.nextElementSibling.innerHTML = "Password length 8 - 15 characters, at least one uppercase letter, one lowercase letter, one&nbsp;number, one special character, space is not&nbsp;allowed";
            break;
    }
    element.style.borderColor = "";
    if (element.classList.contains("have-sibling")) {
        element.nextElementSibling.style.borderColor = "";
    }
    if (func) {
        validDataShow(element);
    }
    if (element.classList.contains("show-error")) {
        element.parentNode.nextElementSibling.style.visibility = "visible";
    }
}

function checkEmail() {
    let isValid = true;
    if (loginEmail.value.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/) === null)

    // Email validator that adheres directly to the specification for email address naming. It allows for everything from ipaddress and country-code domains, to very rare characters in the username.

    {
        invalidDataShow(loginEmail);
        isValid = false;
    } else {
        validDataShow(loginEmail);
        removeClass("show-error", loginEmail);
    }
    return isValid;
}

function checkPassword() {
    let isValid = true;
    if (loginPassword.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/) === null)

    // Strong passwords with min 8 - max 15 character length, at least one uppercase letter, one lowercase letter, one number, one special character (all, not just defined), space is not allowed.

    {
        invalidDataShow(loginPassword);
        isValid = false;
    } else {
        validDataShow(loginPassword);
        removeClass("show-error", loginPassword);
    }
    return isValid;
}

// Show n Hide Password

hideShowPass.addEventListener("click", showAndHidePassword);

function showAndHidePassword() {
    let status = "far fa-eye-slash"
    if (hideShowPass.firstElementChild.classList == status) {
        status = "far fa-eye";
        hideShowPass.previousElementSibling.setAttribute("type", "text");
    } else {
        status = "far fa-eye-slash"
        hideShowPass.previousElementSibling.setAttribute("type", "password");
    }
    hideShowPass.firstElementChild.classList.value = status;
}