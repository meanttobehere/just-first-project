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
  }

  getCounterValue() {
    return Number.parseInt(this.#counter.textContent, 10);
  }

  reset() {
    this.#counter.textContent = '0';
    this.#updateMinusButtonStyle();
  }

  #handleMinusButtonClick() {
    if (this.getCounterValue() === 0) { return; }
    this.#counter.textContent = this.getCounterValue() - 1;
    this.#updateMinusButtonStyle();
  }

  #handlePlusButtonClick() {
    this.#counter.textContent = this.getCounterValue() + 1;
    this.#updateMinusButtonStyle();
  }

  #updateMinusButtonStyle() {
    if (this.getCounterValue() === 0) {
      this.#minusButton.classList.add('dropdown-item__button_disable');
    } else {
      this.#minusButton.classList.remove('dropdown-item__button_disable');
    }
  }
}

document.querySelectorAll('.js-dropdown-item').forEach((dropdownItem) => {
  const dropdownItemDOM = dropdownItem;
  dropdownItemDOM.dropdownItem = new DropdownItem(dropdownItem);
});
