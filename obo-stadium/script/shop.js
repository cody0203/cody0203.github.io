$(window).resize(changeUi);

$(function () {
    $('.price-input').simpleMoneyFormat();
    render();
    changeUi();
    sortNewArrival();
    pagination();
});

$('.sort-content').on('click', function () {
    $('.sort-dropdown').toggle();
});

function changeUi() {
    let sizeItem = $('.filter-bar:not(.small-size) .size .item');
    let sizeChooseWidth = sizeItem.width();
    sizeItem.css("height", `${sizeChooseWidth}px`);

    $(".nav-link#shop").addClass('active-nav');

    if ($('.price-input#from-price').val() == "" && $('.price-input#to-price').val() == "") {
        $('.apply-price:not(.small)').attr('disabled', 'disabled')
    } else {
        $('.apply-price:not(.small)').removeAttr('disabled')
    }
}

// $('.price-input').on('keydown', function () {
//     let inputValue = $(this).val().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//     $(this).val(inputValue);
// })

changeUi();

$('.see-more').on('click', function () {
    $(this).prev().toggle('fast', function () {
        setTimeout(() => {
            if ($(this).css('display') == 'block') {
                $(this).next().text('Rút gọn');
            } else {
                $(this).next().text('Xem thêm');
            }
        }, 100);
    });
})

$('.filter-bar .title').on('click', function () {

    if ($(this).hasClass('collapsed') == false) {
        $(this).children('i.fas').addClass('fa-chevron-down');
        $(this).children('i.fas').removeClass('fa-chevron-up');
    } else {
        $(this).children('i.fas').addClass('fa-chevron-up');
        $(this).children('i.fas').removeClass('fa-chevron-down');
    }
});

// Filter function

let brand = [];
let gender = [];
let size = [];
let price = [{

}];
let releaseDate = [];
let dataSorted;
$(document).on('change', function (e) {
    let target = e.target;
    brand = $('.brand .select-filter .filter-checkbox:checked');
    gender = $('.category .select-filter .filter-checkbox:checked');
    price['from'] = $('#from-price').val();
    price['to'] = $('#to-price').val();
    releaseDate = $('.release-date .select-filter .filter-checkbox:checked');

    if ($('.brand .select-filter .filter-checkbox').is(':checked') == false) {
        $(`.product-link`).show();
    }

    if ($('.filter-bar input').is(":checked") || $('.size .item').hasClass('size-choose') || $('.price-input').val() !== "" || $('#filterModal .price-input').val() !== "") {
        $('.clear-filter').not('.modal-footer .clear-filter').removeAttr('disabled')
    } else {
        $('.clear-filter').not('.modal-footer .clear-filter').attr('disabled', 'disabled')
    }

    if ($('.price-input#from-price').val() == "" && $('.price-input#to-price').val() == "") {
        $('.apply-price:not(.small)').attr('disabled', 'disabled')
    } else {
        $('.apply-price:not(.small)').removeAttr('disabled')
    }
})

// $(document).on('mousemove', function () {
//     size = $('.size .select-filter .item.size-choose');
//     renderFilterData();
// })

// let brandArray;
// let genderArray;
// let sizeArray;
// let releaseDateArray;

// function getFilterData() {
//     brandArray = Array.from(brand).map(item => {
//         return $(item).attr('data-id');
//     });
//     genderArray = Array.from(gender).map(item => {
//         return $(item).attr('data-id');
//     });
//     sizeArray = Array.from(size).map(item => {
//         return Number($(item).attr('data-id'));
//     });

//     releaseDateArray = Array.from(releaseDate).map(item => {
//         return $(item).attr('data-id');
//     });
// }

$(document).on('click', function (e) {
    let target = e.target;

    if (target.closest('.filter-bar .size .item')) {
        $(e.target).toggleClass('size-choose');
        if ($('.size .item').hasClass('size-choose')) {
            $('.clear-filter').not('.modal-footer .clear-filter').removeAttr('disabled')
        } else {
            $('.clear-filter').not('.modal-footer .clear-filter').attr('disabled', 'disabled');
        }
    }

    if (target.closest('.clear-filter')) {
        $('.filter-bar input').prop("checked", false);
        $('.clear-filter').not('.modal-footer .clear-filter').attr('disabled', 'disabled');
        $('.product-link').show();
        brandArray = [];

        if ($('.filter-bar input').is(":checked")) {
            $('.filter-bar input').prop("checked", true);
        } else if ($('.size .item').hasClass('size-choose')) {
            $('.size .item').removeClass('size-choose')
        } else if ($('.price-input').val() !== "" || $('.price-input.small').val() !== "") {
            $('.price-input').val("")
            $('.price-input.small').val("")
        }
    }

    if (target.closest('.filter-icon')) {
        $('.size .select-filter').html("");

        render();
    }

    if (target.closest('.sort-item')) {
        $('.sort-item').removeClass('active');

        $('.sort-name').text($(target).text());
        if ($(target).text() == $('.sort-name').text()) {
            $(target).addClass('active');
        }
    }

    if (!target.closest('.sort-content')) {
        $('.sort-dropdown').css('display', 'none')
    }
});

function convertTime(time) {
    return new Date(time * 1000).toLocaleDateString();
}

function renderFilterData() {
    getFilterData();
    // let a = dataSorted.filter(item => {
    //     // return sizeArray.every(size => {
    //     //     return item['available_size'].indexOf(size) > -1;
    //     // }) && item['gender'].includes(genderArray) && item['brand'].includes(brandArray);
    //     return sizeArray.every(size => {
    //         return item['available_size'].indexOf(size) > -1;
    //     }) && genderArray.every(gender => {
    //         return item['gender'].includes(gender);
    //     })
    // })
    // console.log(a);
    //  && convertTime(item['release_date']).slice(-4) == releaseDateArray

    if (brandArray.length > 0) {
        $(`.product-link`).hide();
        $.each($(brandArray), function (i, val) {
            if ($.isArray(brandArray)) {
                $(`.product-link[data-brand="${val}"]`).show();
            } else {
                $(`.product-link`).show();
            }
        });
    }
}

function sortNewArrival() {
    dataSorted = DB.getProducts();
    let newArrivalData = dataSorted.sort((a, b) => {
        if (b['release_date'] - a['release_date']) {
            return -1
        }
        if (a['release_date'] - b['release_date']) {
            return 1
        }
        return 0
    });

    $('.product-row').html("");
    $('.product-row').html(productElements(newArrivalData));
};

function bestSeller() {
    dataSorted = DB.getProducts();
    let bestSellerData = dataSorted.sort((a, b) => {
        return b['total_sold'] - a['total_sold']
    });

    $('.product-row').html("");
    $('.product-row').html(productElements(bestSellerData));
};

function lowToHighPrice() {
    dataSorted = DB.getProducts();
    let lowToHighPriceData = dataSorted.sort((a, b) => {
        return a['sell_price'] - b['sell_price']
    });

    $('.product-row').html("");
    $('.product-row').html(productElements(lowToHighPriceData));
};

function highToLowPrice() {
    dataSorted = DB.getProducts();
    let highToLowData = dataSorted.sort((a, b) => {
        return b['sell_price'] - a['sell_price']
    });

    $('.product-row').html("");
    $('.product-row').html(productElements(highToLowData));
};

function productElements(data) {
    let productItem = "";

    for (let i = 0; i < data.length; i++) {
        productItem += `
    <a href="./product-details.html" class="product-link" id="${data[i]['id']}" data-brand="${data[i]['brand']}">
        <div class="product position-relative">
            <div class="card">
                <img src="${data[i]['thumbnail']}"
                    class="card-img-top" alt="${data[i]['name']}">
                <div class="card-body">
                    <h5 class="card-title">${data[i]['name']}</h5>
                    <p class="card-text price-desc">Giá thấp nhất hiện tại</p>
                    <p class="price">${currency(data[i]['sell_price'], { separator: ',', precision: 0 }).format()} ₫</p>
                    <p class="card-text sold">Đã bán ${data[i]['total_sold']} đôi</p>
                </div>
            </div>
            <div class="shadow mx-auto position-absolute"></div>
        </div>
    </a>
    `;
    }
    return productItem;
}

$(document).on('click', function (e) {
    let target = e.target;

    if (target.closest('.sort-item')) {
        $('.product-row').data('paginate').kill();
        pagination();
        $('.product-row').data('paginate').switchPage(1)
    }
})

$('.new-arrival').on('click', function () {
    sortNewArrival();
})

$('.best-seller').on('click', function () {
    bestSeller();
})

$('.low-to-high-price').on('click', function () {
    lowToHighPrice();
})

$('.high-to-low-price').on('click', function () {
    highToLowPrice();
})

function pagination() {
    $('.product-row').paginate({
        scope: $('.product-link'),
        perPage: 16,
        containerTag: 'nav',
        paginationTag: 'ul',
        itemTag: 'li',
        linkTag: 'a',
    });
};

