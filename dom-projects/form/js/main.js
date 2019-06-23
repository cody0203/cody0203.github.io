// Go to login & register page

const homeButton = document.querySelectorAll("button");

homeButton.forEach(function (i) {
    i.addEventListener("click", () => {
        redirectPage(i)
    }, false)
});

function redirectPage(button) {
    if (button.id === "login-btn") {
        window.location.assign("login.html");
    } else if (button.id === "register-btn") {
        window.location.assign("register.html");
    }
}