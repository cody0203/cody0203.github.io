$(function () {
    changeUiHomePage();
    carousel();
    render();
})


function changeUiHomePage() {
    $(".nav-link").removeClass('active-nav');

    if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
        $('#promo-banner-1').attr("src", "./image/banner/promo-banner-1-md.png");
        $('#promo-banner-2').attr("src", "./image/banner/promo-banner-2-md.png");
        $('#promo-banner-3').attr("src", "./image/banner/promo-banner-3-md.png");
        $('.navbar').css("padding-bottom", "0px");
        $('.search-form').css("padding-top", "0px");
        $('.search-form').css("padding-bottom", "20px");

    } else {
        $('#promo-banner-1').attr("src", "./image/banner/promo-banner-1-lg.png");
        $('#promo-banner-2').attr("src", "./image/banner/promo-banner-2-lg.png");
        $('#promo-banner-3').attr("src", "./image/banner/promo-banner-3-lg.png");
        $('.navbar').css("padding-bottom", "50px");
        $('.search-form').css("padding-top", "50px");
        $('.search-form').css("padding-bottom", "50px");
    }

    if (window.matchMedia && window.matchMedia('(max-width: 576px)').matches) {
        $('#promo-banner-1').attr("src", "./image/banner/promo-banner-1-sm.png");
        $('#promo-banner-2').attr("src", "./image/banner/promo-banner-2-sm.png");
        $('#promo-banner-3').attr("src", "./image/banner/promo-banner-3-sm.png");
    }
}

$(window).resize(changeUiHomePage);

function render() {
    // Render best seller
    let bestSellerData = productData.sort((a, b) => {
        return b['total_sold'] - a['total_sold']
    });
    let bestSeller = "";

    // Render Staffs Choose
    let staffChooseData = productData.filter(item => {
        return item['status'] == "Staff Choose"
    });
    let staffChoose = "";
    // Render Under Retail

    let underRetailData = productData.filter(item => {
        return item['status'] == "Under Retails"
    });
    let underRetail = "";

    for (let i = 0; i < 5; i++) {
        // Best Seller Elements
        bestSeller += `
            <a class="product product-link position-relative" id="${bestSellerData[i]['id']}" href="./product-details.html">
                <div class="card">
                    <img src="${bestSellerData[i]['thumbnail']}" class="card-img-top"
                        alt="${bestSellerData[i]['name']}">
                    <div class="card-body">
                        <h5 class="card-title">${bestSellerData[i]['name']}</h5>
                        <p class="card-text price-desc">Giá thấp nhất hiện tại</p>
                        <p class="price">${currency(bestSellerData[i]['sell_price'], { separator: ',', precision: 0 }).format()} ₫</p>
                        <p class="card-text sold">Đã bán ${bestSellerData[i]['total_sold']} đôi</p>
                    </div>
                </div>
                <div class="shadow mx-auto position-absolute"></div>
            </a>
        `;

        // Staff Choose Elements
        staffChoose += `
            <a class="product product-link position-relative" id="${staffChooseData[i]['id']}" href="./product-details.html">
                <div class="card">
                    <img src="${staffChooseData[i]['thumbnail']}" class="card-img-top"
                        alt="${staffChooseData[i]['name']}">
                    <div class="card-body">
                        <h5 class="card-title">${staffChooseData[i]['name']}</h5>
                        <p class="card-text price-desc">Giá thấp nhất hiện tại</p>
                        <p class="price">${currency(staffChooseData[i]['sell_price'], { separator: ',', precision: 0 }).format()} ₫</p>
                        <p class="card-text sold">Đã bán ${staffChooseData[i]['total_sold']} đôi</p>
                    </div>
                </div>
                <div class="shadow mx-auto position-absolute"></div>
            </a>
        `;

        // Under Retail Elements
        underRetail += `
            <a class="product product-link position-relative" id="${underRetailData[i]['id']}" href="./product-details.html">
                <div class="card">
                    <img src="${underRetailData[i]['thumbnail']}" class="card-img-top"
                        alt="${underRetailData[i]['name']}">
                    <div class="card-body">
                        <h5 class="card-title">${underRetailData[i]['name']}</h5>
                        <p class="card-text price-desc">Giá thấp nhất hiện tại</p>
                        <p class="price">${currency(underRetailData[i]['sell_price'], { separator: ',', precision: 0 }).format()} ₫</p>
                        <p class="card-text sold">Đã bán ${underRetailData[i]['total_sold']} đôi</p>
                    </div>
                </div>
                <div class="shadow mx-auto position-absolute"></div>
            </a>
        `;
    }

    $('.best-seller .product-row').html(bestSeller);
    $('.staffs-choose .product-row').html(staffChoose);
    $('.under-retail .product-row').html(underRetail);
}