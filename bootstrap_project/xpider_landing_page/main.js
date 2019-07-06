function activeTab() {
    
}

$('.technology-tabs').on('click', function () {
    let contentTabOne = `
          <div class="row">
            <div class="technology-image col-md-5 mr-auto">
              <img src="image/computer.png" alt="computer" class="img-fluid">
            </div>
            <div class="technology-text col-md-6 mt-5 mt-md-0">
              <div class="technology-content-title aileronBold fontSize28px textColor2C2E30">
                Build anything, anytime!
              </div>
              <div class="technology-content-description">
                <ul>
                  <li class="aileronRegular textColor54565A lineHeight28px">
                    Your users are impatient. They're probably distracted too. Keep it simple and beautiful, fun and
                    functional. By a strong
                    concept is what we stand for.
                  </li>

                  <li class="aileronRegular textColor54565A lineHeight28px">
                    They're probably distracted too. Keep it simple & clean, fun and functional. Clean aesthetics
                    supported.
                  </li>
                </ul>
              </div>

              <div class="customer-feedback">
                <div class="customer-feedback-content notoSerifItalic textColor54565A lineHeight28px">
                  “Wow. I just updated my site and it was SO SIMPLE. I am blown away. You guys truly kick ass. Thanks
                  for being so
                  awesome. High fives!”
                </div>

                <div class="customer-info aileronSemiBold textColor2C2E30">
                  James Duren, CTO, Fish&co
                </div>
              </div>
            </div>
          </div>`;

    let contentTabTwo = `
          <div class="row">
            <div class="technology-image col-md-5 mr-auto">
              <img src="image/browser.png" alt="computer" class="img-fluid">
            </div>
            <div class="technology-text col-md-6 mt-5 mt-md-0">
              <div class="technology-content-title aileronBold fontSize28px textColor2C2E30">
                Build anything, anytime!
              </div>
              <div class="technology-content-description">
                <ul>
                  <li class="aileronRegular textColor54565A lineHeight28px">
                    Your users are impatient. They're probably distracted too. Keep it simple and beautiful, fun and
                    functional. By a strong
                    concept is what we stand for.
                  </li>

                  <li class="aileronRegular textColor54565A lineHeight28px">
                    They're probably distracted too. Keep it simple & clean, fun and functional. Clean aesthetics
                    supported.
                  </li>
                </ul>
              </div>

              <div class="customer-feedback">
                <div class="customer-feedback-content notoSerifItalic textColor54565A lineHeight28px">
                  “Wow. I just updated my site and it was SO SIMPLE. I am blown away. You guys truly kick ass. Thanks
                  for being so
                  awesome. High fives!”
                </div>

                <div class="customer-info aileronSemiBold textColor2C2E30">
                  James Duren, CTO, Fish&co
                </div>
              </div>
            </div>
          </div>`;

    let contentTabThree = `
          <div class="row">
            <div class="technology-image col-md-5 mr-auto">
              <img src="image/computer.png" alt="computer" class="img-fluid">
            </div>
            <div class="technology-text col-md-6 mt-5 mt-md-0">
              <div class="technology-content-title aileronBold fontSize28px textColor2C2E30">
                Build anything, anytime!
              </div>
              <div class="technology-content-description">
                <ul>
                  <li class="aileronRegular textColor54565A lineHeight28px">
                    Your users are impatient. They're probably distracted too. Keep it simple and beautiful, fun and
                    functional. By a strong
                    concept is what we stand for.
                  </li>

                  <li class="aileronRegular textColor54565A lineHeight28px">
                    They're probably distracted too. Keep it simple & clean, fun and functional. Clean aesthetics
                    supported.
                  </li>
                </ul>
              </div>

              <div class="customer-feedback">
                <div class="customer-feedback-content notoSerifItalic textColor54565A lineHeight28px">
                  “Wow. I just updated my site and it was SO SIMPLE. I am blown away. You guys truly kick ass. Thanks
                  for being so
                  awesome. High fives!”
                </div>

                <div class="customer-info aileronSemiBold textColor2C2E30">
                  James Duren, CTO, Fish&co
                </div>
              </div>
            </div>
          </div>`;
    if ($('.technology-tabs').hasClass('active-tab')) {
        $('.technology-tabs').removeClass('active-tab');
        $('.technology-tabs').not($(this)).addClass('deactive-tab');
        $(this).addClass('active-tab');
        if ($(this).hasClass('deactive-tab')) {
            $(this).removeClass('deactive-tab');
        }
    }

    if (this == $('.technology-tabs')[0]) {
        $('.technology-content').html(contentTabOne);
    } else if (this == $('.technology-tabs')[1]) {
        $('.technology-content').html(contentTabTwo);
    } else {
        $('.technology-content').html(contentTabThree);
    }
});

$(function () {
    $('.nav-link').last().css('padding-right', '0');
    $('.nav-link').first().css('padding-left', '0');
    changeUi();
    $('#technology-tab-1').addClass('active-tab');
});

$(window).resize(changeUi);

function changeUi() {
    $('.content-block').height(Math.max($('#content-1').height(), $('#content-2').height(), $('#content-3').height()));

    if (window.matchMedia && window.matchMedia('(max-width: 576px)').matches) {
        $('.arrow').css('transform', 'rotate(90deg)');
        $('.how-we-work-wrapper .how-we-work-part-1 .description').css('padding', '0');
    } else {
        $('.arrow').css('transform', '');
        $('.how-we-work-wrapper .how-we-work-part-1 .description').css('padding', '0 44px 0 56px');
    }
}

changeUi();
