"use strict";

let users = [];

function getData(url) {
    $.ajax({
        url: url,
        success: function (data) {
            users = data.items;
            console.log(users);
            render(data.items);
        }
    });    
}

getData("https://cody-json-server.herokuapp.com/db");

function render(users) {
    let tr = '';
    for (let i of users) {
        tr += `
        <tr>
        <td>
            <img src="${i.profile_image}" />
        </td>

        <td id="display_name">
            <a href="${i.link}">${i.display_name}</a>
        </td>

        <td id="user_id">
            ${i.user_id}
        </td>

        <td id="reputation">
            ${i.reputation}
        </td>

        <td>
            <a href="${i.website_url}">Website</a>
        </td>

        <td id="creation_date">
            ${convertTime(i.creation_date)}
        </td>
        </tr>
        `
            ;
    };
    $('tbody').html(tr);
};

function convertTime(unixTime) {
    let date = new Date(unixTime * 1000);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

function reConvertTime(time) {
    let arr = [];
    const firstPart = time.split(" ")[0].split("/");
    const seconPart = time.split(" ")[1].split(":");
    for (let i = 0; i < firstPart.length; i++) {
        arr.unshift(firstPart[Number(i)]);
        arr.push(seconPart[Number(i)]);
    }
    return new Date(...arr) / 1000;
}

let current = null;

function sort(n, order) {
    $('.desc').css('opacity', '0.3');
    $('.asc').css('opacity', '0.3');
    current = order;
    if (order.attr('order') !== 0) {
        $('th').not(current).attr('order', '0');
    }
    let cellDatas = $('tbody tr td:nth-child(' + n + ')').sort(function (a, b) {
        let aValue = a.innerText;
        let bValue = b.innerText;
        if (aValue !== '' && bValue !== '' && !isNaN(aValue) && !isNaN(bValue)) {
            return aValue - bValue
        }
        if (aValue.includes("/") || bValue.includes("/")) {
            return reConvertTime(aValue) - reConvertTime(bValue)
        }
        else {
            return aValue.toString().localeCompare(bValue);
        }
    });
    switch (order.attr('order')) {
        case '0':
            for (let i = 0; i < cellDatas.length; i++) { $(cellDatas[i]).parent().appendTo($('tbody')) }
            order.attr('order', '1');
            order.find('.asc').css('opacity', '1');
            break;
        case '1':
            for (let i = 0; i < cellDatas.length; i++) { $(cellDatas[i]).parent().prependTo($('tbody')) }
            order.attr('order', '2');
            order.find('.asc').css('opacity', '0.3');
            order.find('.desc').css('opacity', '1');
            break;
        case '2':
            for (let i = 0; i < cellDatas.length; i++) { $(cellDatas[i]).parent().appendTo($('tbody')) }
            order.attr('order', '1');
            order.find('.desc').css('opacity', '0.3');
            order.find('.asc').css('opacity', '1');
            break;
    }
}