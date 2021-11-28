class RoomDropdown {
  #dropdown;

  constructor(roomDropdown) {
    this.#dropdown = roomDropdown.querySelector('.js-dropdown').dropdown;
    roomDropdown
      .querySelector('.js-dropdown__menu')
      .addEventListener('click', this.#handleMenuClick.bind(this));
    this.#updateText();
  }

  #handleMenuClick() {
    this.#updateText();
  }

  #updateText(){
    const [
      bedrooms,
      beds,
    ] = this.#dropdown.getItems().map((item) => item.getCounterValue());
    this.#dropdown.setText(RoomDropdown.#generateText(bedrooms, beds));
  }

  static #generateText(bedrooms, beds) {
    let text = '';

    if (bedrooms % 10 === 1 && bedrooms !== 11) {
      text = `${bedrooms} спальня`;
    } else if (bedrooms % 10 >= 2 && bedrooms % 10 <= 4) {
      text = `${bedrooms} спальни`;
    } else {
      text = `${bedrooms} спален`;
    }

    if (beds === 0) { return text; }

    if (beds % 10 === 1 && beds !== 11) {
      text += `, ${beds} кровать...`;
    } else if (beds % 10 >= 2 && beds % 10 <= 4) {
      text += `, ${beds} кровати...`;
    } else {
      text += `, ${beds} кроватей...`;
    }

    return text;
  }
}

export default RoomDropdown;
