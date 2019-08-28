$(function () {
  resetModal();
  if (DB.getSignedStatus() == true) {
    signedValidate(DB.getSignedStatus());
  } else {
    signedValidate();
  }
})

// Login/Sign up validate

$(document).on('click', function (e) {
  let target = e.target;

  // Validate sign in
  if (target.closest('.sign-in-btn')) {
    $('.invalid-feedback').css('display', 'none');
    let emailFormat = new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);

    let isValid = true;
    let signUpEmail = $('.sign-in-email');
    let signUpEmailValue = signUpEmail.val();
    let signUpEmailInvalid = $('.sign-in-email').next();
    let signUpPassword = $('.sign-in-password');
    let signUpPasswordValue = signUpPassword.val();
    let signUpPasswordInvalid = $('.sign-in-password').next();


    if (signUpEmailValue == "") {
      signUpEmailInvalid.css('display', 'block');
      signUpEmailInvalid.html('Vui lòng nhập email');
      isValid = false;
    } else if (!emailFormat.test(signUpEmailValue)) {
      signUpEmailInvalid.css('display', 'block');
      signUpEmailInvalid.html('Email không hợp lệ');
      isValid = false;
    }
    if (signUpPasswordValue == "") {
      signUpPasswordInvalid.css('display', 'block');
      signUpPasswordInvalid.html('Vui lòng nhập password')
      isValid = false;
    }

    // Get data from localStorage

    if (isValid == true) {
      $('.invalid-feedback').css('display', 'none');

      if (!$.isEmptyObject(DB.getAccountData())) {
        let checkAccount = DB.getAccountData().filter(accountData => {
          return accountData[0].includes(signUpEmailValue);
        })

        if (checkAccount !== "") {
          account = checkAccount;
        }
      }


      if (account == false) {
        signUpEmailInvalid.css('display', 'block');
        signUpEmailInvalid.html('Email không đúng');

        signUpPasswordInvalid.css('display', 'block');
        signUpPasswordInvalid.html('Password không đúng');

        isValid = false;
      } else {
        if (signUpEmailValue == account[0][0] && signUpPasswordValue == account[0][1]) {
          $('.modal').modal('hide');
          signed = true;
          DB.setSignedStatus(signed);
          DB.setSignedAccount(account);
          signedValidate(signed);
        }
        if (signUpPasswordValue !== account[0][1]) {
          signUpPasswordInvalid.css('display', 'block');
          signUpPasswordInvalid.html('Password không đúng');
        }
      }
    }
  }

  // Validate sign up
  if (target.closest('.sign-up-btn')) {
    let isValid = true;
    $('.invalid-feedback').css('display', 'none');
    let phoneFormat = new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g);
    let emailFormat = new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);

    let fullName = $('.sign-up-full-name');
    let fullNameValue = fullName.val();
    let fullNameInvalid = fullName.next();
    let phone = $('.sign-up-phone');
    let phoneValue = phone.val();
    let phoneInvalid = phone.next();
    let email = $('.sign-up-email');
    let emailValue = email.val();
    let emailInvalid = email.next();
    let password = $('.sign-up-password');
    let passwordValue = password.val();
    let passwordInvalid = password.next();
    let confirmPassword = $('.sign-up-confirm-password');
    let confirmPasswordValue = confirmPassword.val();
    let confirmPasswordInvalid = confirmPassword.next();

    // Validate name
    if (fullNameValue == "") {
      fullNameInvalid.css('display', 'block');
      fullNameInvalid.html('Vui lòng nhập họ tên');
      isValid = false;
    }

    // Validate phone
    if (phoneValue == "") {
      phoneInvalid.css('display', 'block');
      phoneInvalid.html('Vui lòng nhập số điện thoại');
      isValid = false;
    } else if (!phoneFormat.test(phoneValue)) {
      phoneInvalid.css('display', 'block');
      phoneInvalid.html('Số điện thoại không hợp lệ');
      isValid = false;
    }

    // Validate email
    let checkExistedEmail = true;
    
    if (!Object(DB.getAccountData()).length == 0) {
      SIGNUP_DATA = DB.getAccountData();
      let currentExistedEmail = []

      for (let i = 0; i < SIGNUP_DATA.length; i++) {
        currentExistedEmail.push(SIGNUP_DATA[i][0]);
        if (currentExistedEmail.includes(emailValue) ) {
          checkExistedEmail == false;
        }
      }

      if (!checkExistedEmail) {
        emailInvalid.css('display', 'block');
        emailInvalid.html('Email đã tồn tại, vui lòng chọn email khác');
        isValid = false;
      }
    }

    if (emailValue == "") {
      emailInvalid.css('display', 'block');
      emailInvalid.html('Vui lòng nhập email');
      isValid = false;
    } else if (!emailFormat.test(emailValue)) {
      emailInvalid.css('display', 'block');
      emailInvalid.html('Email không hợp lệ');
      isValid = false;
    }

    // Validate password
    if (passwordValue == "") {
      passwordInvalid.css('display', 'block');
      passwordInvalid.html('Vui lòng nhập password');
      isValid = false;
    }

    // Validate confirm password
    if (confirmPasswordValue == "") {
      confirmPasswordInvalid.css('display', 'block');
      confirmPasswordInvalid.html('Vui lòng xác nhận lại password');
      isValid = false;
    } else if (confirmPasswordValue !== passwordValue) {
      confirmPasswordInvalid.css('display', 'block');
      confirmPasswordInvalid.html('Mật khẩu và xác nhận mật khẩu không giống nhau');
      isValid = false;
    }

    // Save to localStorage

    if (isValid == true) {

      SIGNUP_DATA.push([emailValue, passwordValue, phoneValue, fullNameValue])
      DB.setAccountData(SIGNUP_DATA);
      $('.modal').modal('hide');
    }
  }
})

let SIGNUP_DATA = [];
let signed = false;
let account = false;
// Local storage

let DB = {
  getAccountData: function () {
    if (typeof (Storage) !== "undefined") {
      let data;
      try {
        data = JSON.parse(localStorage.getItem('sign-up')) || {};
      } catch (error) {
        data = {};
      }

      return data;
    } else {
      alert('Sorry! No Web Storage support...');
      return {};
    }
  },

  setAccountData: function (data) {
    localStorage.setItem('sign-up', JSON.stringify(data));
  },

  // Check signed or not
  getSignedStatus: function () {
    if (typeof (Storage) !== "undefined") {
      let data;
      try {
        data = JSON.parse(localStorage.getItem('signed')) || {};
      } catch (error) {
        data = {};
      }

      return data;
    } else {
      alert('Sorry! No Web Storage support...');
      return {};
    }
  },

  setSignedStatus: function (data) {
    localStorage.setItem('signed', data);
  },

  getSignedAccount: function () {
    if (typeof (Storage) !== "undefined") {
      let data;
      try {
        data = JSON.parse(localStorage.getItem('signed-account')) || {};
      } catch (error) {
        data = {};
      }

      return data;
    } else {
      alert('Sorry! No Web Storage support...');
      return {};
    }
  },

  setSignedAccount: function (data) {
    localStorage.setItem('signed-account', JSON.stringify(data));
  },
}

// Reset form after close modal

function resetModal() {
  $('.modal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
    $('.invalid-feedback').css('display', 'none');
  })
}

function signedValidate(status = false) {
  if (status == true) {
    let signedLink = `
  <a class="nav-link account-setting" href="./account.html">Xin chào ${DB.getSignedAccount()[0][3]}</a>`;

    $('.account-setting').replaceWith(signedLink);
  } else {
    let notSignedLink = `
  <a class="nav-link account-setting" href="" data-toggle="modal" data-target="#signInSignUp">Tài khoản</a>
  `;
    $('.account-setting').replaceWith(notSignedLink);
  }
}