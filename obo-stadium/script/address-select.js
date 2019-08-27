$(function () {
  addressSelectRender();
  if (DB_ADDRESS.getShippingInfoCount() !== "") {
    shippingInfoCount = DB_ADDRESS.getShippingInfoCount();
  };

  if (!Object(DB_ADDRESS.getDefaultShippingInfo()).length == 0) {
    let defaultShippingData = DB_ADDRESS.getDefaultShippingInfo();

    let defaultShippingInfo = `
    <div class="info-choose radio-wrapper" id="${defaultShippingData[0]['id']}">
      <input class="address-radio-btn" id="${defaultShippingData[0]['name']}-address" type="radio" name="address-info" checked="" />
      <label for="${defaultShippingData[0]['name']}-address">
        <div class="radio-dot"></div>
        <div class="shipping-data">
          <div class="name-phone">
            <span class="shipping-name">
              <b>${defaultShippingData[0]['name']}</b>
            </span>
            |
            <span class="shipping-phone">${defaultShippingData[0]['phone']}</span>
          </div>
          <div class="address">
            <span class="shipping-adress">${defaultShippingData[0]['address']}, </span>
            <span class="shipping-ward">${defaultShippingData[0]['ward']}, </span>
            <span class="shipping-district">${defaultShippingData[0]['district']}, </span>
            <span class="shipping-city">${defaultShippingData[0]['city']}</span>
          </div>
        </div>
      </label>
    </div>
    `;

    $('.info-wrapper').prepend(defaultShippingInfo);
  };
  changeUi();
});

// UI

function addressSelectRender() {
  let city = [
    "Hà Nội",
    "TP Hồ Chí Minh",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
    "Phú Yên",
    "Cần Thơ",
    "Đà Nẵng",
    "Hải Phòng"
  ]
  let option = `<option>Tỉnh/Thành phố</option>`;
  for (let i = 0; i < city.length; i++) {
    option += `
    <option value="${city[i]}">${city[i]}</option>
    `
  };
  $('.city').html(option);
}

$(document).on('change', function (e) {
  let target = e.target;

  if (target.closest('.city')) {
    let district = [
      "Quận Đống Đa",
      "Huyện Ba Vì",
      "Huyện Chương Mỹ",
      "Huyện Đan Phượng",
      "Huyện Đông Anh",
      "Huyện Gia Lâm",
      "Huyện Hoài Đức",
      "Huyện Mê Linh",
      "Huyện Mỹ Đức",
      "Huyện Phú Xuyên",
      "Huyện Phúc Thọ",
      "Huyện Quốc Oai",
      "Huyện Sóc Sơn",
      "Huyện Thạch Thất",
      "Huyện Thanh Oai",
      "Huyện Thanh Trì",
      "Huyện Thường Tín",
      "Huyện Ứng Hòa",
      "Quận Ba Đình",
      "Quận Bắc Từ Liêm",
      "Quận Cầu Giấy",
      "Quận Hà Đông",
      "Quận Hai Bà Trưng",
      "Quận Hoàn Kiếm",
      "Quận Hoàng Mai",
      "Quận Long Biên",
      "Quận Nam Từ Liêm",
      "Quận Tây Hồ",
      "Quận Thanh Xuân",
      "Thị Xã Sơn Tây"
    ]
    let option = `<option>Quận/Huyện</option>`;

    if ($('.city').val() == "Hà Nội") {
      for (let i = 0; i < district.length; i++) {
        option += `
    <option value="${district[i]}">${district[i]}</option>
    `
      };
      $('.district').html(option);
    }
  }

  if (target.closest('.district')) {
    let ward = [
      "Phường Cát Linh",
      "Phường Hàng Bột",
      "Phường Khâm Thiên",
      "Phường Khương Thượng",
      "Phường Kim Liên",
      "Phường Láng Hạ",
      "Phường Láng Thượng",
      "Phường Nam Đồng",
      "Phường Ngã Tư Sở",
      "Phường Ô Chợ Dừa",
      "Phường Phương Liên",
      "Phường Phương Mai",
      "Phường Quang Trung",
      "Phường Quốc Tử Giám",
      "Phường Thịnh Quang",
      "Phường Thổ Quan",
      "Phường Trung Liệt",
      "Phường Trung Phụng",
      "Phường Trung Tự",
      "Phường Văn Chương",
      "Phường Văn Miếu"
    ]
    let option = `<option>Phường/Xã</option>`;

    if ($('.district').val() == "Quận Đống Đa") {
      for (let i = 0; i < ward.length; i++) {
        option += `
    <option value="${ward[i]}">${ward[i]}</option>
    `
      };
      $('.ward').html(option);
    }
  }
})

// Validate Address

$('.save').on('click', function () {
  let isValid = true;

  let fullName = $('.full-name');
  let fullNameValue = fullName.val();
  let fullNameInvalid = fullName.next();

  let phone = $('.phone');
  let phoneValue = phone.val();
  let phoneInvalid = phone.next();

  let city = $('.city');
  let cityValue = city.val();
  let cityInvalid = city.next();

  let district = $('.district');
  let districtValue = district.val();
  let districtInvalid = district.next();

  let ward = $('.ward');
  let wardValue = ward.val();
  let wardInvalid = ward.next();

  let address = $('#addNewShipping .address');
  let addressValue = address.val();
  let addressInvalid = address.next();

  if (!Object(DB_ADDRESS.getShippingData()).length == 0) {
    NEW_SHIPPING_DATA = DB_ADDRESS.getShippingData();
  };

  $('.invalid-feedback').css('display', 'none');

  // Validate fullName

  if (fullNameValue == "") {
    fullNameInvalid.html(`${$(fullName).attr('data-name')} không được để trống`);
    fullNameInvalid.css('display', 'block');
    isValid = false;
  }

  // Validate phone

  if (phoneValue == "") {
    phoneInvalid.html(`${$(phone).attr('data-name')} không được để trống`);
    phoneInvalid.css('display', 'block');
    isValid = false;
  }

  // Validate city

  if (cityValue == "Tỉnh/Thành phố") {
    cityInvalid.html(`Vui lòng chọn ${$(city).attr('data-name')}`);
    cityInvalid.css('display', 'block');
    isValid = false;
  }

  // Validate district

  if (districtValue == "Quận/Huyện") {
    districtInvalid.html(`Vui lòng chọn ${$(district).attr('data-name')}`);
    districtInvalid.css('display', 'block');
    isValid = false;
  }

  // Validate ward

  if (wardValue == "Phường/Xã") {
    wardInvalid.html(`Vui lòng chọn ${$(ward).attr('data-name')}`);
    wardInvalid.css('display', 'block');
    isValid = false;
  }

  // Validate address

  if (addressValue == "") {
    addressInvalid.html(`Vui lòng nhập ${$(address).attr('data-name')}`);
    addressInvalid.css('display', 'block');
    isValid = false;
  }

  // Config Data
  if (isValid == true) {
    shippingInfoCount++;
    $('.btns').css('display', 'block');
    // Set shipping data

    NEW_SHIPPING_DATA.push({ 'name': fullNameValue, 'phone': phoneValue, 'address': addressValue, 'district': districtValue, 'ward': wardValue, 'city': cityValue, 'id': `shipping-info-${shippingInfoCount}` });
    DB_ADDRESS.setShippingData(NEW_SHIPPING_DATA)
    $('.modal').modal('hide');

    let getNewShippingData = NEW_SHIPPING_DATA.slice(-1);

    // Get shipping data
    let newShippingElement = `
    <div class="info-choose radio-wrapper" id="shipping-info-${shippingInfoCount}">
      <input class="address-radio-btn" id="${getNewShippingData[0]['name']}-address" type="radio" name="address-info" checked="" />
      <label for="${getNewShippingData[0]['name']}-address">
        <div class="radio-dot"></div>
        <div class="shipping-data">
          <div class="name-phone">
            <span class="shipping-name">
              <b>${getNewShippingData[0]['name']}</b>
            </span>
            |
            <span class="shipping-phone">${getNewShippingData[0]['phone']}</span>
          </div>
          <div class="address">
            <span class="shipping-adress">${getNewShippingData[0]['address']}, </span>
            <span class="shipping-ward">${getNewShippingData[0]['ward']}, </span>
            <span class="shipping-district">${getNewShippingData[0]['district']}, </span>
            <span class="shipping-city">${getNewShippingData[0]['city']}</span>
          </div>
        </div>
      </label>
    </div>
    `;

    $('.info-wrapper').append(newShippingElement);

    DB_ADDRESS.setShippingInfoCount(shippingInfoCount);
  }
});

$(document).on('click', function (e) {
  let target = e.target;

  let checkedShippingInfoId = $('input[name=address-info]:checked').parent()
  let selectedShippingInfo = $('input[name=address-info]:checked').parent();

  if (target.closest('.complete')) {
    let changeBtn = `
    <button class="btn btn-primary change red-btn">Thay đổi</button>
    `;
    $('.btns').css('display', 'none');
    $('.add-new').replaceWith(changeBtn);

    $('.info-choose').remove();
    $('.info-wrapper').append(selectedShippingInfo);

    let checkedShippingInfoIndex;
    if (!Object(DB_ADDRESS.getShippingData()).length == 0) {
      NEW_SHIPPING_DATA = DB_ADDRESS.getShippingData();
      checkedShippingInfoIndex = DB_ADDRESS.getShippingData().findIndex(shippingData =>
        shippingData['id'] == checkedShippingInfoId.attr('id')
      );
    };

    if (checkedShippingInfoIndex !== -1) {
      let checkedShippingInfo = NEW_SHIPPING_DATA.splice(checkedShippingInfoIndex, 1);
      DB_ADDRESS.setDefaultShippingInfo(checkedShippingInfo);
    }
  }

  if (target.closest('.change')) {
    let addNewBtn = `
    <button class="btn btn-primary red-btn add-new" data-toggle="modal" data-target="#addNewShipping">+ Thêm Mới</button>
    `;
    $(target).replaceWith(addNewBtn);
    $('.btns').css('display', 'block');

    $('.info-choose').remove();
    let getData = DB_ADDRESS.getShippingData();
    let unCheckedShippingElement = "";
    let checkedShippingElement = "";
    for (let i = 0; i < getData.length; i++) {
      if (getData[i]['id'] == checkedShippingInfoId.attr('id')) {
        checkedShippingElement += `
    <div class="info-choose radio-wrapper" id="${getData[i]['id']}">
      <input class="address-radio-btn" id="${getData[i]['name']}-address" type="radio" name="address-info" checked />
      <label for="${getData[i]['name']}-address">
        <div class="radio-dot"></div>
        <div class="shipping-data">
          <div class="name-phone">
            <span class="shipping-name">
              <b>${getData[i]['name']}</b>
            </span>
            |
            <span class="shipping-phone">${getData[i]['phone']}</span>
          </div>
          <div class="address">
            <span class="shipping-adress">${getData[i]['address']}, </span>
            <span class="shipping-ward">${getData[i]['ward']}, </span>
            <span class="shipping-district">${getData[i]['district']}, </span>
            <span class="shipping-city">${getData[i]['city']}</span>
          </div>
        </div>
      </label>
    </div>
    `;
      } else {
        unCheckedShippingElement += `
    <div class="info-choose radio-wrapper" id="${getData[i]['id']}">
      <input class="address-radio-btn" id="${getData[i]['name']}-address" type="radio" name="address-info" />
      <label for="${getData[i]['name']}-address">
        <div class="radio-dot"></div>
        <div class="shipping-data">
          <div class="name-phone">
            <span class="shipping-name">
              <b>${getData[i]['name']}</b>
            </span>
            |
            <span class="shipping-phone">${getData[i]['phone']}</span>
          </div>
          <div class="address">
            <span class="shipping-adress">${getData[i]['address']}, </span>
            <span class="shipping-ward">${getData[i]['ward']}, </span>
            <span class="shipping-district">${getData[i]['district']}, </span>
            <span class="shipping-city">${getData[i]['city']}</span>
          </div>
        </div>
      </label>
    </div>
    `;
      }
    }
    $('.info-wrapper').prepend(checkedShippingElement);
    $('.info-wrapper').append(unCheckedShippingElement);
  }

  if (target.closest('.cancel')) {
    let changeBtn = `
    <button class="btn btn-primary change red-btn">Thay đổi</button>
    `;
    $('.btns').css('display', 'none');
    $('.add-new').replaceWith(changeBtn);
    $('.info-choose').remove();
    $('.info-wrapper').append(selectedShippingInfo);

  }
})

let NEW_SHIPPING_DATA = [];
let shippingInfoCount = 0;

let DB_ADDRESS = {
  getShippingData: function () {
    if (typeof (Storage) !== "undefined") {
      let data;
      try {
        data = JSON.parse(localStorage.getItem('address')) || {};
      } catch (error) {
        data = {};
      }

      return data;
    } else {
      alert('Sorry! No Web Storage support...');
      return {};
    }
  },

  setShippingData: function (data) {
    localStorage.setItem('address', JSON.stringify(data));
  },

  getShippingInfoCount: function () {
    if (typeof (Storage) !== "undefined") {
      let data;
      try {
        data = JSON.parse(localStorage.getItem('shipping-info-count')) || "";
      } catch (error) {
        data = {};
      }

      return data;
    } else {
      alert('Sorry! No Web Storage support...');
      return {};
    }
  },

  setShippingInfoCount: function (data) {
    localStorage.setItem('shipping-info-count', data);
  },

  getDefaultShippingInfo: function () {
    if (typeof (Storage) !== "undefined") {
      let data;
      try {
        data = JSON.parse(localStorage.getItem('default-address')) || {};
      } catch (error) {
        data = {};
      }

      return data;
    } else {
      alert('Sorry! No Web Storage support...');
      return {};
    }
  },

  setDefaultShippingInfo: function (data) {
    localStorage.setItem('default-address', JSON.stringify(data));
  },
};

function changeUi() {
  if ($('.info-wrapper').html() == "") {
    let addNewBtn = `
    <button class="btn btn-primary red-btn add-new" data-toggle="modal" data-target="#addNewShipping">+ Thêm Mới</button>
    `;
    $(('.change')).replaceWith(addNewBtn);
  } else {
    let changeBtn = `
    <button class="btn btn-primary change red-btn">Thay đổi</button>
    `;
    $('.add-new').replaceWith(changeBtn);
  }
}