$(window).resize(changeUiSideBar);

function changeUiSideBar() {
    let sideBar = $('.sidebar').addClass('small');
    if (window.matchMedia && window.matchMedia('(max-width: 576px)').matches) {
        $('.single-posts').append(sideBar);
    } else {
        sideBar.remove();
        $(sideBar).insertAfter('.main-content .container .posts-content')
        $(sideBar).removeClass('small')
    }
};
changeUiSideBar();