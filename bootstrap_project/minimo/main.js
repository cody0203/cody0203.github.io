$(window).resize(changeUi);

function changeUi() {
    let sideBar = $('.sidebar').addClass('small');
    if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
        $('.single-posts').append(sideBar);
        $('.suggest-items').addClass('small');
    } else {
        sideBar.remove();
        $(sideBar).insertAfter('.main-content .container .posts-content');
        $(sideBar).removeClass('small');
        $('.suggest-items').removeClass('small');
    }
    if (window.matchMedia && window.matchMedia('(max-width: 320px)').matches) {
        $('.comment-textbox').css('padding-left', '5px');
    } else {
        $('.comment-textbox').css('padding-left', '33px');
    }
};
changeUi();