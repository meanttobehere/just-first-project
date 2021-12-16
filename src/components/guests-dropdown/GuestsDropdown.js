class GuestsDropdown {
  #dropdown;

  constructor(guestsDropdown) {
    this.#dropdown = guestsDropdown.querySelector('.js-dropdown').dropdown;
    guestsDropdown
      .querySelector('.js-dropdown__menu')
      .addEventListener('click', this.#handleMenuClick.bind(this));
    this.#updateText();
  }

  #handleMenuClick() {
    this.#updateText();
  }

  #updateText() {
    const [
      adults,
      children,
      babies,
    ] = this.#dropdown.getItems().map((item) => item.getCounterValue());
    this.#dropdown.setText(GuestsDropdown.#getText(adults, children, babies));
  }

  static #getText(adults, children, babies) {
    const getGuestsString = (numGuests) => {
      if (numGuests % 10 === 1 && numGuests !== 11) {
        return `${numGuests} гость`;
      }
      if (numGuests % 10 >= 2 && numGuests % 10 <= 4) {
        return `${numGuests} гостя`;
      }
      return `${numGuests} гостей`;
    };

    const getBabiesString = (numBabies) => {
      if (numBabies % 10 === 1 && numBabies !== 11) {
        return `${numBabies} младенец`;
      }
      if (numBabies % 10 >= 2 && numBabies % 10 <= 4) {
        return `${numBabies} младенца`;
      }
      return `${numBabies} младенцев`;
    };

    const guests = adults + children + babies;
    if (guests > 0 && babies > 0) {
      return `${getGuestsString(guests)}, ${getBabiesString(babies)}`;
    }
    if (guests > 0) {
      return getGuestsString(guests);
    }
    return 'Сколько гостей';
  }
}

export default GuestsDropdown;
