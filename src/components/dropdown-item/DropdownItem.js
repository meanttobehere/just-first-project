class DropdownItem {
  #minusButton;

  #plusButton;

  #counter;

  constructor(item) {
    [
      this.#minusButton,
      this.#plusButton,
    ] = item.querySelectorAll('.js-dropdown-item__button');
    this.#counter = item.querySelector('.js-dropdown-item__counter');

    this.#minusButton.onclick = this.#handleMinusButtonClick.bind(this);
    this.#plusButton.onclick = this.#handlePlusButtonClick.bind(this);

    this.#updateMinusButtonStyle();
  }

  getCounterValue() {
    return Number.parseInt(this.#counter.textContent, 10);
  }

  reset() {
    this.#counter.textContent = '0';
    this.#updateMinusButtonStyle();
  }

  #handleMinusButtonClick() {
    if (this.getCounterValue() === 0) {
      return;
    }
    this.#counter.textContent = this.getCounterValue() - 1;
    this.#updateMinusButtonStyle();
  }

  #handlePlusButtonClick() {
    this.#counter.textContent = this.getCounterValue() + 1;
    this.#updateMinusButtonStyle();
  }

  #updateMinusButtonStyle() {
    if (this.getCounterValue() === 0) {
      this.#minusButton.classList.add(DropdownItem.#classButtonDisable);
    } else {
      this.#minusButton.classList.remove(DropdownItem.#classButtonDisable);
    }
  }

  static #classButtonDisable = 'dropdown-item__button_disable';
}

export default DropdownItem;
