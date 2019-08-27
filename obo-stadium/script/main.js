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
      let account = false;
      let checkAccount = DB.getAccountData().filter(accountData => {
        return accountData[0].includes(signUpEmailValue);
      })

      if (checkAccount !== "") {
        account = checkAccount;
      }

      // for (let i = 0; i < DB.getAccountData().length; i++) {
        // if ($.inArray(signUpEmailValue, DB.getAccountData()[i]) !== -1) {
        //   account = DB.getAccountData()[i];
        // } else {
        //   account = false;
        // }
        // if (DB.getAccountData()[i].indexOf(signUpEmailValue) !== -1) {
        //   account = this;
        // } else {
        //   account = false;
        // }
      // }

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

    let phone = $('.phone');
    let phoneInvalid = $('.phone').next();
    let email = $('.email');
    let emailInvalid = $('.email').next();
    let password = $('.password');
    let passwordInvalid = $('.password').next();
    let confirmPassword = $('.confirm-password');
    let confirmPasswordInvalid = $('.confirm-password').next();


    // Validate phone
    if (phone.val() == "") {
      phoneInvalid.css('display', 'block');
      phoneInvalid.html('Vui lòng nhập số điện thoại');
      isValid = false;
    } else if (!phoneFormat.test(phone.val())) {
      phoneInvalid.css('display', 'block');
      phoneInvalid.html('Số điện thoại không hợp lệ');
      isValid = false;
    }

    // Validate email
    if (email.val() == "") {
      emailInvalid.css('display', 'block');
      emailInvalid.html('Vui lòng nhập email');
      isValid = false;
    } else if (!emailFormat.test(email.val())) {
      emailInvalid.css('display', 'block');
      emailInvalid.html('Email không hợp lệ');
      isValid = false;
    }

    // Validate password
    if (password.val() == "") {
      passwordInvalid.css('display', 'block');
      passwordInvalid.html('Vui lòng nhập password');
      isValid = false;
    }

    // Validate confirm password
    if (confirmPassword.val() == "") {
      confirmPasswordInvalid.css('display', 'block');
      confirmPasswordInvalid.html('Vui lòng xác nhận lại password');
      isValid = false;
    } else if (confirmPassword.val() !== password.val()) {
      confirmPasswordInvalid.css('display', 'block');
      confirmPasswordInvalid.html('Mật khẩu và xác nhận mật khẩu không giống nhau');
      isValid = false;
    }

    // Save to localStorage

    if (isValid == true) {
      if (!Object(DB.getAccountData()).length == 0) {
        SIGNUP_DATA = DB.getAccountData()
      };

      SIGNUP_DATA.push([email.val(), password.val(), phone.val()])
      DB.setAccountData(SIGNUP_DATA);
      $('.modal').modal('hide');
    }
  }
})

let SIGNUP_DATA = [];
let signed = false;

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
}

// Reset form after close modal

function resetModal() {
  $('.modal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
  })
}

function signedValidate(status = false) {
  let signedLink = `
  <a class="nav-link account-setting" href="./account.html">Xin chào</a>`;
  let notSignedLink = `
  <a class="nav-link account-setting" href="" data-toggle="modal" data-target="#signInSignUp">Tài khoản</a>
  `;
  if (status == true) {
    $('.account-setting').replaceWith(signedLink);
  } else {
    $('.account-setting').replaceWith(notSignedLink);
  }
}