$(window).resize(changeUi);

$(function () {
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

$(document).on('change', function (e) {
    let target = e.target;

    if ($('.filter-bar input').is(":checked") || $('.size .item').hasClass('size-choose') || $('.price-input').val() !== "" || $('.price-input.small').val() !== "") {
        $('.clear-filter').removeAttr('disabled')
    } else {
        $('.clear-filter').attr('disabled', 'disabled')
    }

    if ($('.price-input#from-price').val() == "" && $('.price-input#to-price').val() == "") {
        $('.apply-price:not(.small)').attr('disabled', 'disabled')
    } else {
        $('.apply-price:not(.small)').removeAttr('disabled')
    }
})

let filterData = {
    'size': [],
    'brand': [],
    'gender': [],
    'price': {},
    'release-date': []
};

$(document).on('click', function (e) {
    let target = e.target;

    if (target.closest('.brand .filter-checkbox')) {
        filterData['brand'].push($(target).attr('id'))
    }

    if (target.closest('.category .filter-checkbox')) {
        filterData['gender'].push($(target).attr('id'))
    }

    if (target.closest('.release-date .filter-checkbox')) {
        filterData['release-date'].push($(target).attr('id'))
    }

    if (target.closest('.filter-bar .size .item')) {
        $(e.target).toggleClass('size-choose');
        if ($('.size .item').hasClass('size-choose')) {
            $('.clear-filter').removeAttr('disabled')
            filterData['size'].push(Number($(target).attr('id')))
        } else {
            $('.clear-filter').attr('disabled', 'disabled');
        }
    }

    if (target.closest('.clear-filter')) {
        $('.filter-bar input').prop("checked", false);

        if ($('.filter-bar input').is(":checked")) {
            $('.filter-bar input').prop("checked", true);
        } else if ($('.size .item').hasClass('size-choose')) {
            $('.size .item').removeClass('size-choose')
        } else if ($('.price-input').val() !== "" || $('.price-input.small').val() !== "") {
            $('.price-input').val("")
            $('.price-input.small').val("")
        }

        $('.clear-filter').attr('disabled', 'disabled');
        filterData = {
            'size': [],
            'brand': [],
            'gender': [],
            'price': {},
            'release-date': []
        };
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

    if (target.closest('.apply-price')) {
        filterData['price']['from'] = $('.price-input#from-price').val();
        filterData['price']['to'] = $('.price-input#to-price').val();
    }
});

function renderFilterData() {
    let b = DB.getProducts();
    let a = b.filter(item => {
        return filterData['size'].every(size => {
            return item['available_size'].indexOf(size) > -1;
        })
    })
    console.log(a);
    // let a = [];
    // for (let i = 0; i < b.length; i++) {
    //     a.push(b[i]['available_size'].includes(filterData['size'][i]))
    // }
    // console.log(a);
}

function sortNewArrival() {
    let data = DB.getProducts();
    let newArrivalData = data.sort((a, b) => {
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
    let data = DB.getProducts();
    let bestSellerData = data.sort((a, b) => {
        return b['total_sold'] - a['total_sold']
    });

    $('.product-row').html("");
    $('.product-row').html(productElements(bestSellerData));
};

function lowToHighPrice() {
    let data = DB.getProducts();
    let lowToHighPriceData = data.sort((a, b) => {
        return a['sell_price'] - b['sell_price']
    });

    $('.product-row').html("");
    $('.product-row').html(productElements(lowToHighPriceData));
};

function highToLowPrice() {
    let data = DB.getProducts();
    let highToLowData = data.sort((a, b) => {
        return b['sell_price'] - a['sell_price']
    });

    $('.product-row').html("");
    $('.product-row').html(productElements(highToLowData));
};

function productElements(data) {
    let productItem = "";

    for (let i = 0; i < data.length; i++) {
        productItem += `
    <a href="./product-details.html" class="product-link" id="${data[i]['id']}">
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

