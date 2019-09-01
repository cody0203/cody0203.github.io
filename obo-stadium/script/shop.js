$(window).resize(changeUi);

$(function () {
    render();
    changeUi();
    renderProduct();
    $('.product-row').paginate({
        scope: $('.product-link'),
        perPage: 20,
        containerTag: 'nav',
        paginationTag: 'ul',
        itemTag: 'li',
        linkTag: 'a',
    });
});

$('.sort-content').on('click', function () {
    $('.sort-dropdown').toggle();
});

function changeUi() {
    let sizeItem = $('.filter-bar:not(.small-size) .size .item');
    let sizeChooseWidth = sizeItem.width();
    sizeItem.css("height", `${sizeChooseWidth}px`);

    $(".nav-link#shop").addClass('active-nav');
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


$(document).on('click', function (e) {
    let target = e.target;

    if (target.closest('.filter-bar .size .item')) {
        $(e.target).toggleClass('size-choose');
    }

    if (target.closest('.clear-filter')) {
        $('.filter-bar input').prop("checked", false);

        if ($('.filter-bar input').is(":checked")) {
            $('.filter-bar input').prop("checked", true);
        } else if ($('.size .item').hasClass('size-choose')) {
            $('.size .item').removeClass('size-choose')
        } else if ($('.price-input').val() !== "") {
            $('.price-input').val("")
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

function renderProduct() {
    let productItem = "";
    for (let i = 0; i < productData.length; i++) {
        productItem += `
    <a href="./product-details.html" class="product-link" id="${productData[i]['id']}">
        <div class="product position-relative">
            <div class="card">
                <img src="${productData[i]['thumbnail']}"
                    class="card-img-top" alt="${productData[i]['name']}">
                <div class="card-body">
                    <h5 class="card-title">${productData[i]['name']}</h5>
                    <p class="card-text price-desc">Giá thấp nhất hiện tại</p>
                    <p class="price">${currency(productData[i]['sell_price'], { separator: ',', precision: 0 }).format()} ₫</p>
                    <p class="card-text sold">Đã bán ${productData[i]['total_sold']} đôi</p>
                </div>
            </div>
            <div class="shadow mx-auto position-absolute"></div>
        </div>
    </a>
    `;
    }

    $('.product-row').html("");
    $('.product-row').html(productItem);
};


