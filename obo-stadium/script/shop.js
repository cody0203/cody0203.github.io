function render() {
    let size = [35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 47, 47.5, 48, 48.5, 49, 49.5, 50, 50.5, 51, 52, 52, 54, 55];

    for (let i of size) {
        let sizeChoose = `
    <div class="item">
        ${i}
    </div>
    `;
        $('.filter-bar .size .select-filter').append(sizeChoose);
    };
}


function changeUi() {
    let sizeItem = $('.filter-bar .size .item');
    let sizeChooseWidth = sizeItem.width();
    sizeItem.css("height", `${sizeChooseWidth}px`);
}

function priceInputValidate(e) {
    let event = e || window.event;
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

$(document).on('click', function (e) {
    if (e.target.closest('.filter-bar .size .item')) {
        $(e.target).toggleClass('size-choose');
    }
});

$(window).resize(changeUi);

$(function () {
    render();
    changeUi()
})