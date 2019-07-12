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
    getListData: function () {
        if (typeof (Storage) !== "undefined") {
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
    setListData: function (data) {
        localStorage.setItem('card', JSON.stringify(data));
    },
    getCountData: function () {
        if (typeof (Storage) !== "undefined") {
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
    setCountData: function (data) {
        localStorage.setItem('count', JSON.stringify(data));
    },
    getListContent: function (data) {
        if (typeof (Storage) !== "undefined") {
            let list;
            try {
                list = JSON.parse(localStorage.getItem('list')) || {};
            } catch (error) {
                list = {};
            }

            return list;
        } else {
            alert('Sorry! No Web Storage support...');
            return {};
        }
    },
    setListContent: function (data) {
        localStorage.setItem('list', JSON.stringify(data));
    },
    getTaskContent: function (data) {
        if (typeof (Storage) !== "undefined") {
            let list;
            try {
                list = JSON.parse(localStorage.getItem('task-content')) || {};
            } catch (error) {
                list = {};
            }

            return list;
        } else {
            alert('Sorry! No Web Storage support...');
            return {};
        }
    },
    setTaskContent: function (data) {
        localStorage.setItem('task-content', JSON.stringify(data));
    },
}

$(function () {
    draggingTask();
    countCard();
    kanbard.countList();
    kanbard.getList();
    kanbard.getListContent();
    kanbard.getTaskContent();

    COUNT_LIST.forEach(function(type) {
        kanbard.addListToKanbard(type, LIST_TITLE[type]['title']);
        
        if (LIST_TITLE[type]['task'] == undefined) {
            LIST_TITLE[type]['task'] = [];
        }
        if (LIST_TITLE[type]['task'] !== undefined) {
            for (let i in LIST_TITLE[type]['task']) {
                kanbard.addTaskToList(type, LIST_TITLE[type]['task'][i]);
            }
        }
    })
});

let COUNT_LIST;
let countList;
let LIST_TITLE;
let TASK_CONTENT;

function countCard() {
    let listCount = $('.card').length;
    for (let i = 1; i <= listCount; i++) {
        $(`.number[data-id="card_${i}_count"]`).text($(`.card[data-id="card_${i}"] .task-wrapper`).length)
    }
}

function draggingTask() {
    $('.card-content-wrapper').sortable({
        items: '.task-slot',
        cursor: 'move',
        connectWith: '.card-content-wrapper',
        placeholder: 'task-hatch',

        start: function (event, ui) {
            $(ui.item[0]).addClass('dragging');

            let taskHatch = $(this).find('.task-hatch');

            $(taskHatch).height($(ui.item[0]).outerHeight());
        },

        stop: function (event, ui) {
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

$(document).on('click', function (e) {

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
    countList: function () {
        if (!Number(DB.getCountData())) {
            countList = 0;
        } else {
            countList = DB.getCountData();
        }
    },
    getList: function () {
        COUNT_LIST = [];
        if (!Object(DB.getListData()).length == 0) {
            COUNT_LIST = DB.getListData()
        }
    },
    getListContent: function () {
        LIST_TITLE = {};
        if (Object(DB.getListContent()).length !== 0) {
            LIST_TITLE = DB.getListContent();
        }
    },
    getTaskContent: function () {
        TASK_CONTENT = [];
        if (!Object(DB.getTaskContent()).length == 0) {
            TASK_CONTENT = DB.getTaskContent();
        }
    },
    closeAddTaskBox: function () {
        $('.add-new-task-box').remove();
        $('.add-new-task-wrapper').css('display', 'flex');

    },
    addNewTask: function (type) {
        let taskContent = $('.new-task-content').val();
        let timeCreate = new Date();
        
        if (LIST_TITLE[type]['task'] == undefined) {
            LIST_TITLE[type]['task'] = [];
        }
        if ($('.new-task-content').val().trim() !== "") {
            LIST_TITLE[type]['task'].push(taskContent);
            DB.setListContent(LIST_TITLE);
            kanbard.addTaskToList(type, taskContent);
            $('.add-new-task-box').remove();
            $('.add-new-task-wrapper').css('display', 'flex');
        }
        countCard();
    },
    addTaskToList: function(type, taskContent) {
        let createTime = new Date();
        let newTask = `
        <div class="task-wrapper task-slot" data-id="${type}">
            <div class="task-header">
                <div class="create-time">
                    ${createTime.toLocaleString()}
                </div>

                <div class="icons">
                    <i class="fas fa-pen" onclick="kanbard.editTask(this)"></i>
                    <i class="far fa-trash-alt" onclick="kanbard.deleteTask(this)"></i>
                </div>
            </div>

            <div class="task-content">
                ${taskContent}
            </div>

            <div class="tag-wrapper">
                <div class="tag">
                    Low Priority
                </div>
            </div>
        </div>`;
        $(`.add-new-task-wrapper[data-id="${type}_add_new_task"]`).before(newTask);
        countCard();
    },
    deleteTask: function (target) {
        let modal = $('#delete-task-modal');
        let task = $(target).parents('.task-wrapper');
        modal.modal();
        modal.modal('open');

        $('#modal-delete-btn').off('click');
        $('#modal-delete-btn').on('click', function () {
            let listType = $(target).parent().parent().parent();
            let dataID = $(listType).attr('data-id')
            let taskPosition = listType.index((`.task-wrapper[data-id="${dataID}"]`));

            console.log(taskPosition, listType, dataID);
            task.remove();
            countCard();
        })
    },
    editTask: function (target) {
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

        $('#modal-save-btn').on('click', function () {
            $(task).text($(editBox).val())
        })

    },
    addNewList: function (e, target) {
        let newListBox = `
        <div class="add-new-list-wrapper">
            <div class="add-new-list-box">
    
                <textarea type="text" class="new-list-title" onkeyup="newTaskContentBox(this)" placeholder="Enter your list title" autofocus></textarea>

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
    addListTask: function () {
        countList++;
        type = `card_${countList}`;
        let listTitle = $('.new-list-title').val();

        if (listTitle !== "") {
            LIST_TITLE[type] = { title: listTitle };
            DB.setListContent(LIST_TITLE);
            draggingTask();
            DB.setCountData(countList);
            kanbard.addListToKanbard(type, listTitle);
            $('.add-new-list-wrapper').remove();
            COUNT_LIST.push(type);
            DB.setListData(COUNT_LIST);
        }
    },
    addListToKanbard: function(type, listTitle) {
        let newList = `
        <div class="card" data-id="${type}">
                <div class="card-content-wrapper ui-sortable">
                    <div class="header no-drag">
                        <h4 class="title">${listTitle}</h4>
                        <div class="counting-task">
                            <div class="square">
                                <div class="number" data-id="${type}_count">0
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="task-slot ui-sortable-handle"></div>

                    <div class="add-new-task-wrapper no-drag" data-id="${type}_add_new_task">
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

        $('.list').append(newList);
        $('.add-new-card').remove();
        $(addNewList).insertAfter($('.card').last());
    },
    closeAddListBox: function () {

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
}

$(document).on('click', '.close-add-list-box', kanbard.closeAddListBox)

function newTaskContentBox(area) {
    area.style.height = "0px";
    area.style.height = (20 + area.scrollHeight) + "px";
}