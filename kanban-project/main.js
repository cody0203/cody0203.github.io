// function getCardData() {
//     let list = []
//     $(".card").map(function() { list.push($(this).attr("data-id")); }).get();
//     COUNT_LIST.push(list.filter((item, index) => {
//         if (list.indexOf(item) == index) {
//             return item;
//         }
//     }));
// }

let DB = {
    getListData: function() {
        if (typeof(Storage) !== "undefined") {
            let list;
            try {
                list = JSON.parse(localStorage.getItem('card')) || {};
            } catch (error) {
                list = {};
            }

            return list;
        } else {
            alert('Sorry! No Web Storage support...');
            return {};
        }
    },
    setListData: function(data) {
        localStorage.setItem('card', JSON.stringify(data));
    },
    getCountData: function() {
        if (typeof(Storage) !== "undefined") {
            let list;
            try {
                list = JSON.parse(localStorage.getItem('count')) || {};
            } catch (error) {
                list = {};
            }

            return list;
        } else {
            alert('Sorry! No Web Storage support...');
            return {};
        }
    },
    setCountData: function(data) {
        localStorage.setItem('count', JSON.stringify(data));
    },
}

$(function() {
    draggingTask();
    countCard();
    // getCardData();
    kanbard.renderList(DB.getListData());
    // COUNT_LIST = DB.getListData();
    kanbard.countList();
    kanbard.getList();
});

let COUNT_LIST = [];
let countList;

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

        start: function(event, ui) {
            $(ui.item[0]).addClass('dragging');

            let taskHatch = $(this).find('.task-hatch');

            $(taskHatch).height($(ui.item[0]).outerHeight());
        },

        stop: function(event, ui) {
            $(ui.item[0]).removeClass('dragging');
            countCard();
        }
    })
}

function addNewTaskBox(e) {
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
}

$(document).on('click', function(e) {

    let addNewList = `
                <div class="add-new-card" onclick="kanbard.addNewList(event, this)">
                <i class="fas fa-plus-circle"></i>
                <div class="add-new-task">
                    Add new list ...
                </div>
            </div>
    `

    if (!e.target.closest('.add-new-task-box') && !$(e.target).hasClass('.add-new-task-wrapper')) {
        $('.add-new-task-box').remove();
        $('.add-new-task-wrapper').css('display', 'flex');
    }
    if (!e.target.closest('.add-new-list-wrapper')) {
        $('.add-new-list-wrapper').replaceWith(addNewList);
    }
});

$(document).on('click', '.add-new-task-wrapper', addNewTaskBox);

let kanbard = {
    countList: function() {
        if (!Number(DB.getCountData())) {
            countList = 1;
        } else {
            countList = DB.getCountData();
        }
    },
    getList: function() {
        if (Object(DB.getListData()).length !== 0) {
            COUNT_LIST = DB.getListData()
        }
    },
    closeAddTaskBox: function() {
        $('.add-new-task-box').remove();
        $('.add-new-task-wrapper').css('display', 'flex');

    },
    addNewTask: function(type) {
        let newTask = `
        <div class="task-wrapper task-slot">
                            <div class="task-header">
                                <div class="create-time">
                                    7/9/2019, 4:31:23 PM
                                </div>
                
                                <div class="icons">
                                    <i class="fas fa-pen" onclick="kanbard.editTask(this)"></i>
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
    deleteTask: function(target) {
        let modal = $('#delete-task-modal');
        let task = $(target).parents('.task-wrapper');
        modal.modal();
        modal.modal('open');

        $('#modal-delete-btn').on('click', function() {
            task.remove();
            countCard();
        })
    },
    editTask: function(target) {
        let task = $(target).parent().parent().siblings('.task-content');

        let oldContent = $(task).text();

        let modal = $('#edit-task-modal');
        modal.modal();
        modal.modal('open');

        let editBox = $('.edit-content');
        editBox.val(oldContent.trim());
        let len = editBox.val().length;
        editBox[0].focus();
        editBox[0].setSelectionRange(len, len);

        $('#modal-save-btn').on('click', function() {
            $(task).text($(editBox).val())
        })

    },
    addNewList: function(e, target) {
        let newListBox = `
        <div class="add-new-list-wrapper">
            <div class="add-new-list-box">
    
                <textarea type="text" class="new-task-content" onkeyup="newTaskContentBox(this)" placeholder="Enter your list title" autofocus></textarea>

                <div class="footer">
                    <button class="add-new-task-btn" onclick="kanbard.addListTask()">Add List</button>
                    <i class="fas fa-times close-add-list-box""></i>
                </div>
            </div>
        </div>
        `;

        let addNewList = `
                <div class="add-new-card" onclick="kanbard.addNewList(event, this)">
                <i class="fas fa-plus-circle"></i>
                <div class="add-new-task">
                    Add new list ...
                </div>
            </div>
    `;
        $('.add-new-list-wrapper').replaceWith(addNewList);
        $(target).replaceWith(newListBox);
        e.stopPropagation();
    },
    addListTask: function() {
        type = `card-${countList}`;
        let emptyList = `
        <div class="card" data-id="${type}">
                <div class="card-content-wrapper ui-sortable">
                    <div class="header no-drag">
                        <h4 class="title">${$('.new-task-content').val()}</h4>
                        <div class="counting-task">
                            <div class="square">
                                <div class="number" data-id="${type}-count">0
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="task-slot ui-sortable-handle"></div>

                    <div class="add-new-task-wrapper no-drag" data-id="${type}-add-new-task">
                        <i class="fas fa-plus-circle"></i>
                        <div class="add-new-task">
                            Add new task ...
                        </div>
                    </div>
                </div>
            </div>
        `;

        let addNewList = `
                    <div class="add-new-card" onclick="kanbard.addNewList(event, this)">
                <i class="fas fa-plus-circle"></i>
                <div class="add-new-task">
                    Add new list ...
                </div>
            </div>
        `;

        if ($('.new-task-content').val() !== "") {
            $('.add-new-list-wrapper').replaceWith(emptyList);
            draggingTask();
            DB.setCountData(countList);
            countList++;
            $(addNewList).insertAfter($('.card').last());
            COUNT_LIST.push(type);
            DB.setListData(COUNT_LIST);
        }
    },
    closeAddListBox: function() {

        let addNewList = `
                    <div class="add-new-card" onclick="kanbard.addNewList(event, this)">
                <i class="fas fa-plus-circle"></i>
                <div class="add-new-task">
                    Add new list ...
                </div>
            </div>
        `;
        ($(this).parents('.add-new-list-wrapper')).replaceWith(addNewList);
    },
    renderList: function(list) {
        let listRender = []
        if (list !== [] || list !== "undefined") {
            for (let i in list) {
                listRender += `
                <div class="card" data-id="${list[i]}">
                    <div class="card-content-wrapper ui-sortable">
                        <div class="header no-drag">
                            <h4 class="title">${$('.new-task-content').val()}</h4>
                            <div class="counting-task">
                                <div class="square">
                                    <div class="number" data-id="${list[i]}-count">0
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="task-slot ui-sortable-handle"></div>

                        <div class="add-new-task-wrapper no-drag"   data-id="${list[i]}-add-new-task">
                            <i class="fas fa-plus-circle"></i>
                            <div class="add-new-task">
                            Add new task ...
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
            $('.list').prepend(listRender);
        }
    }
}

$(document).on('click', '.close-add-list-box', kanbard.closeAddListBox)

function newTaskContentBox(area) {
    area.style.height = "0px";
    area.style.height = (20 + area.scrollHeight) + "px";
}