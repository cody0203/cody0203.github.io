$(function() {
    changeUi();
})

$(window).resize(changeUi);

function changeUi() {
    let navbarBtn = $('.navbar .cta');

    if (window.matchMedia && window.matchMedia('(max-width: 992px)').matches) {
        $('.hero-banner').css('background-image', 'url(image/banner-copy.png)');
        $('.navbar .cta').remove();
        $(navbarBtn).insertBefore('.navbar-toggler');
    } else {
        $('.hero-banner').css('background-image', 'url(image/banner.png)');
        $('.navbar .cta').remove();
        $(navbarBtn).insertAfter('.navbar-collapse');
    }
    if (window.matchMedia && window.matchMedia('(max-width: 468px)').matches) {
        $('.navbar .cta').remove();
        $(navbarBtn).insertAfter('.nav-item:last-child');
    }

    $('.speakers-profile .box').height(Math.max($('.speaker-one .box').height(), $('.speaker-two .box').height()));
}