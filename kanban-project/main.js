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

        <div class="footer">
            <button class="add-new-task-btn" onclick="kanbard.addNewTask('${$(this).parents('.card').attr('data-id')}')">Add Task</button>
            <i class="fas fa-times close-add-task-box" onclick="kanbard.closeAddTaskBox()"></i>
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

let kanbard = {
    closeAddTaskBox: function () {
        $('.add-new-task-box').remove();
        $('.add-new-task-wrapper').css('display', 'flex');

    },
    addNewTask: function (type) {
        let newTask = `
        <div class="task-wrapper task-slot">
                            <div class="task-header">
                                <div class="create-time">
                                    7/9/2019, 4:31:23 PM
                                </div>
                
                                <div class="icons">
                                    <i class="fas fa-pen"></i>
                                    <i class="far fa-trash-alt" onclick="kanbard.deleteTask(this)"></i>
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
    },
    deleteTask: function (target) {
        let modal = $('#modal1');
        let task = $(target).parents('.task-wrapper');
        modal.modal();
        modal.modal('open');

        $('#modal-delete-btn').on('click', function () {
            task.remove();
            countCard();
        })
    },
    editTask: function (target) {
        let task = $(target).parent().parent().siblings('.task-content');

        let tag = $(target).parent().parent().siblings('.tag-wrapper');
        let oldContent = $(task).text();
        let editContent = `
        
        <div class="edit-content-box">

            <textarea type="text" class="edit-content" onkeyup="newTaskContentBox(this)" placeholder="Enter your task"  autofocus value="value text">${oldContent.trim()}</textarea>

            <div class="footer">
                <button class="save-task-btn" onclick="kanbard.saveEditTask(this)">Save</button>
                <i class="fas fa-times close-add-task-box" onclick="kanbard.closeAddTaskBox()"></i>
            </div>
        </div>
        `;

        $(task).replaceWith($(editContent));

        let editBox = $('.edit-content');
        let len = editBox.val().length;
        editBox[0].focus();
        editBox[0].setSelectionRange(len, len);
        tag.hide();
    },
    saveEditTask: function(target) {
        let getOldContent = $(target).parent().parent().children('.edit-content');

        let editBox = $(target).parent().parent();

        let newContent = `
        <div class="task-content">
            ${$(getOldContent).val()}
        </div>
        `;
        if ($(getOldContent).val() !== "") {
            $(editBox).replaceWith($(newContent));
            $('.tag-wrapper').show();    
        } else {
            
        }
    }
}

function newTaskContentBox(area) {
    area.style.height = "0px";
    area.style.height = (20 + area.scrollHeight) + "px";
}