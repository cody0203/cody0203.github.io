$(function () {
    carosel();
    imageZoom();
    instafeed();
});

function carosel() {
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav',
    });

    $('.slider-nav').slick({
        slidesToShow: 3, // 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    });
};

function imageZoom() {
    $('.img-zoom-container').zoom({
        magnify: 1.05
    });
}

function instafeed() {
    var feed = new Instafeed({
        get: 'tagged',
        tagName: 'awesome',
        clientId: '2940736713.1677ed0.31bb22b2b0f84befacc79c6afd025134'
    });
    feed.run();
}