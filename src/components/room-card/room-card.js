function cardInit(card){
    const [back, forward] = card.getElementsByClassName('js-room-card__arrow');
    const images = card.getElementsByClassName('js-room-card__image');
    
    let currentImage = 0;
    images[currentImage].classList.add("room-card__image_left");

    back.addEventListener('click', () => {
        images[currentImage].classList.remove("room-card__image_left");

        currentImage -= 1;
        if (currentImage < 0) {currentImage = images.length - 1}        

        images[currentImage].classList.add("room-card__image_left");
    })

    forward.addEventListener('click', () => {
        images[currentImage].classList.remove("room-card__image_left");

        currentImage += 1;
        if (currentImage >= images.length) {currentImage = 0}   

        images[currentImage].classList.add("room-card__image_left");
    })
}

function roomCardsInit(){
    const cards = document.getElementsByClassName('js-room-card');
    for (let i = 0; i < cards.length; i++) {cardInit(cards[i])};
}

roomCardsInit();