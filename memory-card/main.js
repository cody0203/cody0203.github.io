function cardName() {
    let number = [];
    for (let i = 1; i <= 6; i++) {
        number.push(i);
    }
    return number;
}

let cards = cardName();

let current = null;

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
                card.addClass('disappear');
                current.addClass('disappear');
                current.attr('onclick', '');
                card.attr('onclick', '');
                current = null;
            }, 800);
        }

    }
}

$(function() {
    cards = cards.concat(cards);
    cards = shuffle(cards);

    let html = '';
    for (let i = 0; i < cards.length; i++) {
        html +=
        `<div class="card-wrapper">
            <div class="card" onclick="flip($(this))" data-name="${cards[i]}">
                <div class="front">
                    <img src="card_design/${cards[i]}.png" alt="image-${cards[i]}" class="img-fluid">
                </div>
                <div class="back">
                    <img src="card_design/back.png" alt="back-card" class="img-fluid">
                </div>
            </div>
        </div>`;
    };
    $('.container').html(html);
})