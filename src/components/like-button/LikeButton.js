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
    return this.#likeButton.classList.contains(LikeButton.#classChecked);
  }

  #setEphasized() {
    this.#likeButton.classList.add(LikeButton.#classChecked);
  }

  #unsetEmphasized() {
    this.#likeButton.classList.remove(LikeButton.#classChecked);
  }

  #getCounterValue() {
    return parseInt(this.#counter.textContent, 10);
  }

  #setCounterValue(value) {
    this.#counter.textContent = value;
  }

  static #classChecked = 'like-button_checked';
}

export default LikeButton;
