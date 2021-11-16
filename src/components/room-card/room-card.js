class RoomCard{
  #images;
  #dots;
  #currentImageNum = 1;

  constructor(card){
    const [back, forward] = card.querySelectorAll('.js-room-card__button');
    this.#images = card.querySelectorAll('.js-room-card__image');
    this.#dots = card.querySelectorAll('.js-room-card__dot');

    back.addEventListener('click', this._handleBackClick.bind(this));
    forward.addEventListener('click', this._handleForwardClick.bind(this));
    this.#dots.forEach(dot => {
      dot.addEventListener('click', this._handleDotClick.bind(this));
    });

    this._updateCard();
  }

  _handleBackClick(){
    this.#currentImageNum -= 1;
    if (this.#currentImageNum < 0) {
      this.#currentImageNum = this.#images.length - 1;
    }
    this._updateCard();
  }

  _handleForwardClick(){
    this.#currentImageNum += 1;
    if (this.#currentImageNum >= this.#images.length) {
      this.#currentImageNum = 0;
    }
    this._updateCard();
  }

  _handleDotClick(event){
    this.#currentImageNum = [...this.#dots].findIndex(dot => dot === event.target);
    this._updateCard();
  }

  _updateCard(){
    this.#images.forEach((image, idx) => {
      if (this.#currentImageNum === idx) {
        image.classList.add('room-card__image_visible');
      }
      else { image.classList.remove('room-card__image_visible'); }
    });
    this.#dots.forEach((dot, idx) => {
      if (this.#currentImageNum === idx) {
        dot.classList.add('room-card__dot_selected');
      }
      else { dot.classList.remove('room-card__dot_selected'); }
    });
  }
}

document.querySelectorAll('.js-room-card').forEach(roomCard => {
  roomCard._roomCard = new RoomCard(roomCard);
})