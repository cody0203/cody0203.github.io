$(function () {
    $('.nav-link').last().css('padding-right', '0');
    $('.nav-link').first().css('padding-left', '0');
    changeUi();
    getTestimonialsBlocksContentHeight();
});

$(window).resize(changeUi);

function changeUi() {
    $('.content-block').height(Math.max($('#content-1').height(), $('#content-2').height(), $('#content-3').height()));

    if (window.matchMedia && window.matchMedia('(max-width: 576px)').matches) {
        $('.arrow').css('transform', 'rotate(90deg)');
        $('.how-we-work-wrapper .how-we-work-part-1 .description').css('padding', '0');
        // $('.testimonials-wrapper .testimonials-blocks').css('margin', '0 17px 0 17px');
    } else {
        $('.arrow').css('transform', '');
        $('.how-we-work-wrapper .how-we-work-part-1 .description').css('padding', '0 44px 0 56px');

    }
}

changeUi();