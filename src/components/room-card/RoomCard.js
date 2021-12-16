class RoomCard {
  #card;

  #container;

  #back;

  #forward;

  #images;

  #dots;

  #currentImageNum = 0;

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
    this.#currentImageNum = (this.#currentImageNum === 0)
      ? this.#images.length - 1
      : this.#currentImageNum - 1;

    this.#update();
  }

  #handleForwardClick() {
    this.#currentImageNum = (this.#currentImageNum + 1) % this.#images.length;
    this.#update();
  }

  #handleDotClick(e) {
    this.#currentImageNum = [...this.#dots].findIndex((dot) => dot === e.target);
    this.#update();
  }

  #handleContainerClick() {
    this.#card.submit();
  }

  #update() {
    this.#images.forEach((image, idx) => {
      const dot = this.#dots[idx];
      const classVisible = 'room-card__image_visible';
      const classSelected = 'room-card__dot_selected';
      if (this.#currentImageNum === idx) {
        image.classList.add(classVisible);
        dot.classList.add(classSelected);
      } else {
        image.classList.remove(classVisible);
        dot.classList.remove(classSelected);
      }
    });
  }
}

export default RoomCard;
