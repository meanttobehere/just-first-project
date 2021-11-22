class RoomCard {
  #card;

  #container;

  #back;

  #forward;

  #images;

  #dots;

  #currentImageNum = 1;

  constructor(card) {
    this.#card = card;
    this.#container = card.querySelector('.js-room-card__container');
    [
      this.#back,
      this.#forward,
    ] = card.querySelectorAll('.js-room-card__button');
    this.#images = card.querySelectorAll('.js-room-card__image');
    this.#dots = card.querySelectorAll('.js-room-card__dot');

    this.#init();
  }

  #init() {
    this.#back.addEventListener('click', this.#handleBackClick.bind(this));
    this.#forward.addEventListener('click', this.#handleForwardClick.bind(this));
    this.#container
      .addEventListener('click', this.#handleContainerClick.bind(this));
    this.#dots.forEach((dot) => {
      dot.addEventListener('click', this.#handleDotClick.bind(this));
    });

    this.#update();
  }

  #handleBackClick() {
    this.#currentImageNum -= 1;
    if (this.#currentImageNum < 0) {
      this.#currentImageNum = this.#images.length - 1;
    }
    this.#update();
  }

  #handleForwardClick() {
    this.#currentImageNum += 1;
    if (this.#currentImageNum >= this.#images.length) {
      this.#currentImageNum = 0;
    }
    this.#update();
  }

  #handleDotClick(event) {
    this.#currentImageNum = [...this.#dots]
      .findIndex((dot) => dot === event.target);
    this.#update();
  }

  #handleContainerClick() {
    this.#card.submit();
  }

  #update() {
    this.#images.forEach((image, idx) => {
      if (this.#currentImageNum === idx) {
        image.classList.add('room-card__image_visible');
      } else { image.classList.remove('room-card__image_visible'); }
    });
    this.#dots.forEach((dot, idx) => {
      if (this.#currentImageNum === idx) {
        dot.classList.add('room-card__dot_selected');
      } else { dot.classList.remove('room-card__dot_selected'); }
    });
  }
}

export default RoomCard;
