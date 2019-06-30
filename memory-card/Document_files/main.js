
let current = null;
let count = 0;
let remainingTime = 30;
let difficult = 0;
let run;

function cardName() {
    let number = [];
    for (let i = 1; i <= difficult; i++) {
        number.push(`c${i}`);
    }
    return number;
}

function flip(card) {
    card.toggleClass('flip');
    if (!current) {
        current = card;
        current.css('pointer-events', 'none');
    } else {
        if (current.attr('data-name') != card.attr('data-name')) {
            setTimeout(() => {
                card.toggleClass('flip');
                current.toggleClass('flip');
                current = null;
                $('.card').css('pointer-events', 'auto');
            }, 1000);
            $('.card').css('pointer-events', 'none');
        } else {
            setTimeout(() => {
                current.css('pointer-events', 'none');
                card.addClass('disappear');
                current.addClass('disappear');
                current.attr('onclick', '');
                card.attr('onclick', '');
                current = null;
                count++;
                if (count == 4) {
                    clearInterval(run);
                }
            }, 800);
        }

    }
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function playMode() {
    run = setInterval(() => {
            remainingTime--;
            console.log(remainingTime);
            if (remainingTime == 0) {
                clearInterval(run);
            }
        }, 1000);
}

$(document).on('click', '.difficult', function() {
    $('#start').addClass('disappear');
    playMode();
    if ($(this).attr('data-id') == "normal") {
        difficult = 12;
        $('.container').css('grid-template-columns', '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr')
    } else if ($(this).attr('data-id') == "hard") {
        difficult = 18;
        $('.container').css('grid-template-columns', '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr')
    } else if ($(this).attr('data-id') == "doom") {
        difficult = 24;
    } 
    a();
})

function a() {
    let cards = cardName();
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
}