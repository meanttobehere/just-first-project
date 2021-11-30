class LikeButton {
  #counter;

  #likeButton;

  constructor(likeButton) {
    this.#likeButton = likeButton;
    this.#counter = likeButton.querySelector('.js-like-button__counter');
    likeButton.addEventListener('click', this.#handleLikeButtonClick.bind(this));
  }

  #handleLikeButtonClick() {
    if (this.#isEmphasized()) {
      this.#setCounterValue(this.#getCounterValue() - 1);
      this.#unsetEmphasized();
    } else {
      this.#setCounterValue(this.#getCounterValue() + 1);
      this.#setEphasized();
    }
  }

  #isEmphasized() {
    return this.#likeButton.classList.contains('like-button_checked');
  }

  #setEphasized() {
    this.#likeButton.classList.add('like-button_checked');
  }

  #unsetEmphasized() {
    this.#likeButton.classList.remove('like-button_checked');
  }

  #getCounterValue() {
    return parseInt(this.#counter.textContent, 10);
  }

  #setCounterValue(value) {
    this.#counter.textContent = value;
  }
}

export default LikeButton;
