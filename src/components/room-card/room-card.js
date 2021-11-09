function updateImagesAndDots(images, dots, idx) {
  for (let i = 0; i < images.length; i += 1) {
    images[i].classList.remove('room-card__image_visible');
    dots[i].classList.remove('room-card__dot_selected');
  }
  images[idx].classList.add('room-card__image_visible');
  dots[idx].classList.add('room-card__dot_selected');
}

function cardInit(card) {
  const [back, forward] = card.getElementsByClassName('js-room-card__button');
  const images = card.getElementsByClassName('js-room-card__image');
  const dots = card.getElementsByClassName('js-room-card__dot');

  let currentImage = 0;
  updateImagesAndDots(images, dots, currentImage);

  back.addEventListener('click', () => {
    currentImage -= 1;
    if (currentImage < 0) { currentImage = images.length - 1; }
    updateImagesAndDots(images, dots, currentImage);
  });

  forward.addEventListener('click', () => {
    currentImage += 1;
    if (currentImage >= images.length) { currentImage = 0; }
    updateImagesAndDots(images, dots, currentImage);
  });

  for (let i = 0; i < 4; i += 1) {
    dots[i].addEventListener('click', () => {
      currentImage = i;
      updateImagesAndDots(images, dots, currentImage);
    });
  }
}

function roomCardsInit() {
  const cards = document.getElementsByClassName('js-room-card');
  for (let i = 0; i < cards.length; i += 1) { cardInit(cards[i]); }
}

roomCardsInit();
