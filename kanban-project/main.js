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
}

$(function () {
    draggingContent();
    countCard();
    kanbard.countList();
    kanbard.getList();
    kanbard.getListContent();

    COUNT_LIST.forEach(function(type) {
        kanbard.addListToKanbard(type, LIST_TITLE[type]['title']);

        if (LIST_TITLE[type]['task'] == undefined) {
            LIST_TITLE[type]['task'] = [];
        }
        if (LIST_TITLE[type]['task'] !== undefined) {
            for (let i in LIST_TITLE[type]['task']) {
                kanbard.addTaskToList(type, LIST_TITLE[type]['task'][i]['taskOrder'], LIST_TITLE[type]['task'][i]['time']);
            }
        }
        setTitleHeight(type);
    })
});

function draggingContent() {
    $('.card-content-wrapper').sortable({
        items: '.task-slot',
        cursor: 'move',
        connectWith: '.card-content-wrapper',
        placeholder: 'task-hatch',

        start: function (event, ui) {
            $(ui.item[0]).addClass('dragging');
            let taskHatch = $(this).find('.task-hatch');
            $(taskHatch).height($(ui.item[0]).outerHeight());

            ui.item.oldListType = ui.item.context.parentElement.parentElement.parentElement.getAttribute('data-id');
            ui.item.oldTaskPosition = ui.item.index();
            console.log(ui.item)
        },

        stop: function (event, ui) {
            $(ui.item[0]).removeClass('dragging');
            countCard();
            let taskSlot = `
            <div class="task-slot"></div> 
            `;
            let item = ui.item;
            let oldListType = item.oldListType;
            let oldTaskPosition = item.oldTaskPosition;
            
            let newListType = item.context.parentElement.parentElement.parentElement.getAttribute('data-id');
            let newTaskPosition = item.index();
            item.context.setAttribute('data-id', newListType);

            LIST_TITLE[oldListType]['task'].splice(oldTaskPosition, 1);

            LIST_TITLE[newListType]['task'].splice(newTaskPosition, 0, {
                taskOrder: $(item.context).find('.task-content')[0].innerText,
                time: $(item.context).find('.create-time')[0].innerText
            });
            DB.setListContent(LIST_TITLE);
            $('.task-slot:not(.task-wrapper)').remove();
            $(taskSlot).insertBefore('.add-new-task-wrapper');
        }
    })
    // $('.list').sortable({
    //     items: '.list-slot',
    //     cursor: 'move',
    //     placeholder: 'list-hatch',
    //     start: function (event, ui) {
    //         $(ui.item[0]).addClass('dragging');
    //         let taskHatch = $(this).find('.list-hatch');
    //         $(taskHatch).height($(ui.item[0]).outerHeight());
    //         $(taskHatch).width($(ui.item[0]).width());
    //     },
    //     stop: function (event, ui) {
    //         $(ui.item[0]).removeClass('dragging');
    //     }

    // })
}

function setTitleHeight(type) {
    let target = $(`.card[data-id="${type}"`).find('.title');
    $(target).height($(target).get(0).scrollHeight - 16);
}

let COUNT_LIST;
let countList;
let LIST_TITLE;

function countCard() {
    let listCount = $('.card').length;
    for (let i = 1; i <= listCount; i++) {
        $(`.number[data-id="card_${i}_count"]`).text($(`.card[data-id="card_${i}"] .task-wrapper`).length)
    }
}

function addNewTaskBox(e) {
    let event = window.event || e;
    let inputTaskValue = `
    
    <div class="add-new-task-box">
    
        <textarea type="text" class="new-task-content" onkeyup="newTaskContentBox(this)" placeholder="Enter your task"></textarea>

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
    $('.new-task-content').focus();
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
    closeAddTaskBox: function () {
        $('.add-new-task-box').remove();
        $('.add-new-task-wrapper').css('display', 'flex');
    },
    addNewTask: function (type) {
        let taskContent = $('.new-task-content').val();
        let createTime = new Date().toLocaleString();
        if (LIST_TITLE[type]['task'] == undefined) {
            LIST_TITLE[type]['task'] = [];
        }
        if (taskContent.trim() !== "") {
            LIST_TITLE[type]['task'].push({
                taskOrder: taskContent,
                time: createTime
            });
            DB.setListContent(LIST_TITLE);
            kanbard.addTaskToList(type, taskContent, createTime);
            $('.add-new-task-box').remove();
            $('.add-new-task-wrapper').css('display', 'flex');
        }
        countCard();
    },
    addTaskToList: function(type, taskContent, createTime) {
        let taskSlot = `
        <div class="task-slot"></div> 
        `;
        let newTask = `
        <div class="task-wrapper task-slot" data-id="${type}">
            <div class="task-header">
                <div class="create-time">
                    ${createTime}
                </div>

                <div class="icons">
                    <i class="fas fa-pen" onclick="kanbard.editTask(this)"></i>
                    <i class="far fa-trash-alt" onclick="kanbard.deleteTask(this)"></i>
                </div>
            </div>

            <div class="task-content">
                ${taskContent}
            </div>

        </div>`;
        $(`.add-new-task-wrapper[data-id="${type}_add_new_task"]`).before(newTask);
        countCard();
        $('.task-slot:not(.task-wrapper)').remove();
        $(taskSlot).insertBefore('.add-new-task-wrapper');
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

            LIST_TITLE[dataID]['task'].splice(taskPosition, 1);
            DB.setListContent(LIST_TITLE);
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

        $('#modal-save-btn').off('click')
        $('#modal-save-btn').on('click', function () {
            let editTime = new Date().toLocaleString()
            $(task).text($(editBox).val())
            let taskTarget = $(target).parent().parent().parent();
            $(taskTarget).find('.create-time').text(editTime);
            let listType = task.parent().parent().parent().parent();
            let dataID = $(listType).attr('data-id')
            let taskPosition = taskTarget.index(`.task-wrapper[data-id="${dataID}"]`);
            LIST_TITLE[dataID]['task'][taskPosition] = {
                ['taskOrder']:  $(editBox).val(),
                ['time']: editTime
            };
            DB.setListContent(LIST_TITLE);
            console.log(taskTarget, listType)
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
            DB.setCountData(countList);
            kanbard.addListToKanbard(type, listTitle);
            $('.add-new-list-wrapper').remove();
            COUNT_LIST.push(type);
            DB.setListData(COUNT_LIST);
        }
    },
    addListToKanbard: function(type, listTitle) {
        let newList = `
        <div class="card list-slot" data-id="${type}">
                <div class="card-content-wrapper">
                    <div class="header no-drag">
                        <textarea class="title" onkeyup="newTaskContentBox(this)" onkeydown="kanbard.updateListTitle(event, this)" onfocusout="kanbard.updateListTitle(event, this)">${listTitle}</textarea>
                        <div class="counting-task">
                            <div class="square">
                                <div class="number" data-id="${type}_count">0
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tasks">
                        <div class="task-slot"></div>
                    <div class="add-new-task-wrapper no-drag" data-id="${type}_add_new_task">
                        <i class="fas fa-plus-circle"></i>
                        <div class="add-new-task">
                            Add new task ...
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        `;

        let addNewList = `
                    <div class="list-slot"></div>
                    <div class="add-new-card" onclick="kanbard.addNewList(event, this)">
                <i class="fas fa-plus-circle"></i>
                <div class="add-new-task">
                    Add new list ...
                </div>
            </div>
        `;

        $('.list').append(newList);
        $('.add-new-card').remove();
        $('.list-slot:not(.card)').remove();
        $(addNewList).insertAfter($('.card').last());
        draggingContent();
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
    updateListTitle: function(e, target) {
        let event = window.event || e;
        $(target).val($(target).val());
        let dataID = $(target).parent().parent().parent().attr('data-id')
        LIST_TITLE[dataID]['old-title'] = LIST_TITLE[dataID]['title'];
        LIST_TITLE[dataID]['title'] = $(target).val();
        DB.setListContent(LIST_TITLE);
        if ($(target).val() == "") {
            $(target).val(LIST_TITLE[dataID]['old-title']);
            LIST_TITLE[dataID]['title'] = LIST_TITLE[dataID]['old-title'];
            DB.setListContent(LIST_TITLE);
        }
        if (event.keyCode == 13) {
            $(target).blur();
        }
    }
}

$(document).on('click', '.close-add-list-box', kanbard.closeAddListBox)

function newTaskContentBox(area) {
    area.style.height = "0px";
    area.style.height = (16 + area.scrollHeight) + "px";
}