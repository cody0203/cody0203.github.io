function changeUiHomePage() {
    if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
        $('#promo-banner-1').attr("src", "./image/banner/promo-banner-1-md.png");
        $('#promo-banner-2').attr("src", "./image/banner/promo-banner-2-md.png");
        $('#promo-banner-3').attr("src", "./image/banner/promo-banner-3-md.png");
    } else {
        $('#promo-banner-1').attr("src", "./image/banner/promo-banner-1-lg.png");
        $('#promo-banner-2').attr("src", "./image/banner/promo-banner-2-lg.png");
        $('#promo-banner-3').attr("src", "./image/banner/promo-banner-3-lg.png");
    }

    if (window.matchMedia && window.matchMedia('(max-width: 576px)').matches) {
        $('#promo-banner-1').attr("src", "./image/banner/promo-banner-1-sm.png");
        $('#promo-banner-2').attr("src", "./image/banner/promo-banner-2-sm.png");
        $('#promo-banner-3').attr("src", "./image/banner/promo-banner-3-sm.png");
    }

    if (window.matchMedia && window.matchMedia('(max-width: 765px)').matches) {
        $("header .content .slogan").css("display", "none");
        $('.navbar').css("padding-bottom", "10px");
        $('.search-form').css("padding-top", "10px");
        $('.search-form').css("padding-bottom", "20px");
    } else {
        $("header .content .slogan").css("display", "block");
        $('.navbar').css("padding-bottom", "50px");
        $('.search-form').css("padding-top", "50px");
        $('.search-form').css("padding-bottom", "50px");
    }
}

$(function () {
    changeUiHomePage();
    carousel();
})

$(window).resize(changeUiHomePage);

function carousel() {
    $('.carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        centerMode: true,
        focusOnSelect: true,
        variableWidth: true,
        touchThreshold: 6,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: true,
                    dots: true
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
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    
}

