$(function () {
  $('.hot-jobs-wrapper').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $('.prev-arrow'),
    nextArrow: $('.next-arrow'),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.jobs-showcase').infiniteScroll({
    // options
    path: '.pagination__next',
    append: '.jobs-item',
    history: false,
  });
})  