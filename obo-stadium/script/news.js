$(window).resize(changeUi);

$(function () {
  changeUi();
});

function changeUi() {
  $(".nav-link#news").addClass('active-nav');
}