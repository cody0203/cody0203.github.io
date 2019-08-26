$(function () {
  addressSelectRender();
});

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

$(document).on('change', function(e) {
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

$('.save').on('click', function() {
  let isValid = true;

  let fullName = $('.full-name');
  let phone = $('.phone');
  let city = $('.city');
  let district = $('.district');
  let ward = $('.ward');
  let address = $('#addNewShipping .address');

  $('.invalid-feedback').css('display', 'none');

  if (fullName.val() == "") {
    fullName.next().html(`${$(fullName).attr('data-name')} không được để trống`);
    fullName.next().css('display', 'block');
    isValid = false;
  }

  if (phone.val() == "") {
    phone.next().html(`${$(phone).attr('data-name')} không được để trống`);
    phone.next().css('display', 'block');
    isValid = false;
  }

  if (city.val() == "Tỉnh/Thành phố") {
    city.next().html(`Vui lòng chọn ${$(city).attr('data-name')}`);
    city.next().css('display', 'block');
    isValid = false;
  }

  if (district.val() == "Quận/Huyện") {
    district.next().html(`Vui lòng chọn ${$(district).attr('data-name')}`);
    district.next().css('display', 'block');
    isValid = false;
  }

  if (ward.val() == "Phường/Xã") {
    ward.next().html(`Vui lòng chọn ${$(ward).attr('data-name')}`);
    ward.next().css('display', 'block');
    isValid = false;
  }

  if (address.val() == "") {
    address.next().html(`Vui lòng nhập ${$(address).attr('data-name')}`);
    address.next().css('display', 'block');
    isValid = false;
  }
  
  if (isValid == true) {
    $('.modal-body').trigger('reset');
    
    $("#addNewShipping").modal('hide');
  }
})  