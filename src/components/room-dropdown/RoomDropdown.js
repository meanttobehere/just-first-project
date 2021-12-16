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

  #updateText() {
    const [
      bedrooms,
      beds,
      bathrooms,
    ] = this.#dropdown.getItems().map((item) => item.getCounterValue());
    this.#dropdown.setText(RoomDropdown.#getText(bedrooms, beds, bathrooms));
  }

  static #getText(bedrooms, beds) {
    const getBedroomsString = (numBedrooms) => {
      if (numBedrooms % 10 === 1 && numBedrooms !== 11) {
        return `${numBedrooms} спальня`;
      }
      if (numBedrooms % 10 >= 2 && numBedrooms % 10 <= 4) {
        return `${numBedrooms} спальни`;
      }
      return `${numBedrooms} спален`;
    };

    const getBedsString = (numBeds) => {
      if (numBeds % 10 === 1 && numBeds !== 11) {
        return `${numBeds} кровать`;
      }
      if (numBeds % 10 >= 2 && numBeds % 10 <= 4) {
        return `${numBeds} кровати`;
      }
      return `${numBeds} кроватей`;
    };

    if (bedrooms > 0 && beds > 0) {
      return `${getBedroomsString(bedrooms)}, ${getBedsString(beds)}...`;
    }
    if (bedrooms > 0) {
      return getBedroomsString(bedrooms);
    }
    if (beds > 0) {
      return getBedsString(beds);
    }
    return 'Сколько спален';
  }
}

export default RoomDropdown;
