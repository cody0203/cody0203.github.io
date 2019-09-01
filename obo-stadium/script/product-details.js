$(function () {
    caroselProductImage();
    imageZoom();
    instafeed();
    render();
    activeSize();
    sizeGuideRender();
    changeUi();
});

function caroselProductImage() {
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
    var userFeed = new Instafeed({
        get: 'user',
        userId: '330880789',
        limit: 12,
        resolution: 'standard_resolution',
        accessToken: '330880789.8a4b3ba.6801db3f819744bcb3a10ecf47bc4a5b',
        sortBy: 'most-recent',
        filter: function (image) {
            return image.tags.indexOf('adidasyeezyboost700waverunner') >= 0;
        },
        template: '<div class="col-lg-3 instaimg"><a class="instafeed-wrap" href="{{link}}" target="_blank"><div class="instaimg-wrap"><img src="{{image}}" alt="{{caption}}" class="img-fluid insta-img"/><div class="instaimg-overlay"><div class="like-and-comment"><label><i class="fas fa-heart"></i> {{model.likes.count}}</label> <label><i class="fas fa-comment"></i></i> {{model.comments.count}}</label></div></div></div></a></div>',
        after: function () {
            caroselInstafeed();
            $('#instafeed').addClass('grid-instafeed')
        }
    });

    userFeed.run();
    $('.slick-track').append($('.instaimg'));
}

function caroselInstafeed() {
    $('#instafeed').slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        appendArrows: $('.instagram-image .slide-btn'),
        accessibility: false,
        centerMode: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    });
}

function changeUi() {
    $(".nav-link#shop").addClass('active-nav');
}