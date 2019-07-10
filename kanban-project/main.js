$(function() {
    draggingTask();
    countCard();
});

function countCard() {
    let listCount = $('.card').length;
    for (let i = 1; i <= listCount; i++) {
        $(`.number[data-id="card-${i}-count"]`).text($(`.card[data-id="card-${i}"] .task-wrapper`).length)
    }
}

$('.card').on('change', countCard());

function addNewTask() {
    $('.add-new-task')
}

function draggingTask() {
    $('.card-content-wrapper').sortable({
        items: '.task-slot',
        cursor: 'move',
        connectWith: '.card-content-wrapper',
        placeholder: 'task-hatch',

        start: function() {
        },
        
        stop: function() {
            countCard();
        }
    })
}
