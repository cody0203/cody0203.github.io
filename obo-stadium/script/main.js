function changeUiHomePage() {
    if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
        $('#promo-banner-1').attr("src", "../image/promo-banner-1-1.png");
        $('#promo-banner-2').attr("src", "../image/promo-banner-1-2.png");
        $('#promo-banner-3').attr("src", "../image/promo-banner-1-3.png");
    } else {
        $('#promo-banner-1').attr("src", "../image/promo-banner-1.png");
        $('#promo-banner-2').attr("src", "../image/promo-banner-2.png");
        $('#promo-banner-3').attr("src", "../image/promo-banner-3.png");
    }

    if (window.matchMedia && window.matchMedia('(max-width: 576px)').matches) {
        $('#promo-banner-1').attr("src", "../image/promo-banner-1-1-1.png");
        $('#promo-banner-2').attr("src", "../image/promo-banner-1-2-1.png");
        $('#promo-banner-3').attr("src", "../image/promo-banner-1-3-1.png");
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
    $('.slick-arrow').remove();
})

$(window).resize(changeUiHomePage);

function carousel() {
    $('.carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
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

