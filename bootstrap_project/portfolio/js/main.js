$(window).resize(changeUiFirstPart);

function changeUiFirstPart() {
    if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) {
        $('#first-part').removeClass('fixed-position');
    } else {
        $('#first-part').addClass('fixed-position');
    }
    if (window.matchMedia && window.matchMedia('(max-width: 320px)').matches) {
        $('.content').removeClass('ml-5');
        $('.content').addClass('justify-content-center');
    }
};
changeUiFirstPart();

function autoTyping() {
    let typed = new Typed(".typing", {
        strings: [` `, `Hi, I'm Cody`],
        typeSpeed: 40,
        showCursor: false
    });

    let typed2 = new Typed(".typing2", {
        strings: [` `, `Front-end website developer based in Hanoi`],
        typeSpeed: 40,
        startDelay: 1500,
        showCursor: false
    });
}
autoTyping();
