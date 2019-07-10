$(function () {
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

        start: function () {
        },

        stop: function () {
            countCard();
        }
    })
}

$('.add-new-task-wrapper').on('click', function (e, card, newTask) {
    let event = window.event || e;
    let inputTaskValue = `
    
    <div class="add-new-task-box">
    
    <textarea type="text" class="new-task-content" onkeyup="newTaskContentBox(this)" placeholder="Enter your task" autofocus></textarea>

    <div class="btn">
        <button class="add-new-task-btn" onclick="addTask('${$(this).parents('.card').attr('data-id')}')">Add Task</button>
        <i class="fas fa-times close-add-task-box" onclick="closeAddTaskBox()"></i>
    </div>
    </div>
    `;

    $('.add-new-task-box').remove();
    $('.add-new-task-wrapper').css('display', 'flex');

    $(inputTaskValue).insertAfter(this);
    $(this).css('display', 'none');


    e.stopPropagation();
})


$(document).on('click', function (e) {

    if (!e.target.closest('.add-new-task-box') && !$(e.target).hasClass('.add-new-task-wrapper')) {
        $('.add-new-task-box').remove();
        $('.add-new-task-wrapper').css('display', 'flex');
    }
})

function closeAddTaskBox() {
    $('.add-new-task-box').remove();
    $('.add-new-task-wrapper').css('display', 'flex');
}

function addTask(type) {

    let newTask = `
    <div class="task-wrapper task-slot">
                        <div class="task-header">
                            <div class="create-time">
                                7/9/2019, 4:31:23 PM
                            </div>
            
                            <div class="icons">
                                <i class="fas fa-pen"></i>
                                <i class="far fa-trash-alt"></i>
                            </div>
                        </div>
            
                        <div class="task-content">
                            ${$('.new-task-content').val()}
                        </div>
            
                        <div class="tag-wrapper">
                            <div class="tag">
                                Low Priority
                            </div>
                        </div>
                    </div>
    `;

    if ($('.new-task-content').val().trim() !== "") {
        $(`.add-new-task-wrapper[data-id="${type}-add-new-task"]`).before(newTask);
        $('.add-new-task-box').remove();
        $('.add-new-task-wrapper').css('display', 'flex');
    }
    countCard();
};

function newTaskContentBox(area) {
    area.style.height = "0px";
    area.style.height = (20 + area.scrollHeight) + "px";
}