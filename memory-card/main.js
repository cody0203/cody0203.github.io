"use strict";


let current = null;
let count = 0;
let remainingTime = 60;
let cardsTotal = 24;
let run;
let numberOfCards = '';
let difficult = 0;
let countHint = 6;

function cardName() {
    let number = [];
    for (let i = 1; i <= cardsTotal; i++) {
        number.push(`c${i}`);
    }
    return number;
}
let cards = cardName();

function flip(card) {
    card.toggleClass('flip');
    if (countHint <= 0 || current) {
        $('.hint').css('pointer-events', 'none');
    } else {
        $('.hint').css('pointer-events', 'auto');
    }
    if (!current) {
        current = card;
        current.css('pointer-events', 'none');
        if (current.css('box-shadow') == "rgb(255, 255, 255) 0px 0px 13px 2px") {
            $('.hint').css('pointer-events', 'none');
        }
    }
    else {
        if (current.attr('data-name') != card.attr('data-name')) {
            $('.hint').css('pointer-events', 'none');
            setTimeout(() => {
                card.toggleClass('flip');
                current.toggleClass('flip');
                current = null;
                $('.card').css('pointer-events', 'auto');
                $('.card').css('box-shadow', '');
            }, 1000);
            $('.card').css('pointer-events', 'none');
        } else {
            setTimeout(() => {
                card.addClass('disappear');
                current.addClass('disappear');
                current.attr('onclick', '');
                card.attr('onclick', '');
                current = null;
                count++;
                if (count == difficult) {
                    clearInterval(run);
                    let currentProgress = $('#bar').css('width');
                    $('#bar').css('width', `${currentProgress}%`)
                    setTimeout(() => {
                        $('.win').addClass('win-wrap');
                        $('.end-background').css('display', 'block');
                        $('.card').css('pointer-events', 'none');
                    }, 2000);
                }
                $('.card').css('pointer-events', 'auto');
            }, 800);
            $('.card').css('pointer-events', 'none');
        }

    }
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function playMode(difficult) {
    run = setInterval(() => {

        if (difficult == 'normal') {
            remainingTime--;
            let progress = remainingTime / 60 * 100;
            $('#bar').css('width', `${progress}%`);
            
        } else {
            remainingTime -= 2;
            let progress = remainingTime / 60 * 100;
            $('#bar').css('width', `${progress}%`);
        }
        if (remainingTime == 0) {
            clearInterval(run);
            setTimeout(() => {
                $('.icon').addClass('disappear');
                $('.lose').addClass('lose-wrap');
                $('.thanos-end').addClass('end-img');
                $('.end-background').css('display', 'block');
                $('.card').css('pointer-events', 'none');
            }, 2000);
        }
    }, 1000);
}

function chooseDifficult() {
    $(document).on('click', '.difficult', function () {
        $('#choose-difficult').addClass('disappear');
        if ($(this).attr('data-id') == "normal") {
            difficult = 6;
            numberOfCards = shuffle(cardName()).slice(0, difficult);
            playMode('normal');
            $('.container').addClass('normal');
        } else if ($(this).attr('data-id') == "hard") {
            difficult = 12;
            numberOfCards = shuffle(cardName()).slice(0, difficult);
            playMode('hard');
            $('.container').addClass('hard');
            hint();
        } else if ($(this).attr('data-id') == "doom") {
            difficult = 18;
            numberOfCards = shuffle(cardName()).slice(0, difficult);
            playMode('doom');
            $('.container').addClass('doom');
            hint();
        }
        renderCard();
    });
}
chooseDifficult();

function hint() {
    $('.hint').css('display', 'block');
        if (countHint <= 0) {
            $('.hint').css('pointer-events', 'none');
        } else {
            $(`[data-name="${$(current).attr('data-name')}"]`).css('box-shadow', 'white 0 0 13px 2px');
            countHint--;
            console.log(countHint);
            if (current !== null) {
                $('.hint').css('pointer-events', 'none');
        }
    }
}

$('.hint').on('click', hint);

function renderCard() {
    let cards = numberOfCards;
    cards = cards.concat(cards);
    cards = shuffle(cards);

    let html = '';
    for (let i = 0; i < cards.length; i++) {
        html +=
            `
        <div class="card-wrapper style="opacity: 0">
            <div class="card" onclick="flip($(this))" data-name="${cards[i]}">
                <div class="front">
                    <img src="cards/back.png" alt="back-card">
                </div>
                <div class="back">
                    <img src="cards/${cards[i]}.jpg" alt="image-${cards[i]}">
                </div>
            </div>
        </div>`;
    };
    $('.container').html(html);
    $('.card-wrapper').css('opacity', '1');
    cards = shuffle(cards);
    $('#progress').css('opacity', '1');
};

$(document).on('click', '.try-again', function () {
    $('.container').html('');
    $('.container').removeClass('doom');
    $('.container').removeClass('hard');
    $('.container').removeClass('normal');
    $('#progress').css('opacity', '0');
    $('#choose-difficult').removeClass('disappear');
    $('.win').removeClass('win-wrap');
    $('.lose').removeClass('lose-wrap');
    $('.end-background').css('display', 'none');
    $('.icon').removeClass('disappear');
    $('#bar').css('width', `100%`);
    remainingTime = 60;
    count = 0;
    current = null;
    cardsTotal = 24;
    countHint = 6;
})