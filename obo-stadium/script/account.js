$('.sign-out-btn').on('click', function() {
  signed = false;
  DB.setSignedStatus(signed);
  localStorage.removeItem('signed-account');
})