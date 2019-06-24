const btnEnterQuizzy = document.querySelector("#enter-quizzy");

const input = document.querySelector("#name-enter");

btnEnterQuizzy.addEventListener("click", validateInput);

function validateInput(event) {
    let startQuiz = document.querySelector("#start-the-quiz");
    let error = document.querySelector("#error")
    let flag = true;
    if (input.value == "") {
        error.textContent = `Please enter your name to start Quizzy`
        flag = false;
    } else {
        error.textContent = "";
        startQuiz.style.animation = "startquiz 2s ease both";
    }
    return flag;
}

let names = [];