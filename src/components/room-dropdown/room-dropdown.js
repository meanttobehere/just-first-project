import '../dropdown/dropdown';

class RoomDropdown{
  #dropdown;

  constructor(roomDropdown){
    this.#dropdown = roomDropdown.querySelector('.js-dropdown')._dropdown;
    roomDropdown
      .querySelector('.js-dropdown__menu')
      .addEventListener('click', this._handleMenuClick.bind(this));
  }

  _handleMenuClick(){
    const [
      bedrooms,
      beds
    ] = this.#dropdown.getItems().map(item => item.getCounterValue());
    this.#dropdown.setText(this._generateText(bedrooms, beds));
  }

  _generateText(bedrooms, beds){
    let text = '';

    if (bedrooms % 10 === 1 && bedrooms !== 11) { text = `${bedrooms} спальня`; }
    else if (bedrooms % 10 >= 2 && bedrooms % 10 <= 4) { text = `${bedrooms} спальни`; }
    else { text = `${bedrooms} спален`; }

    if (beds === 0) { return text; }

    if (beds % 10 === 1 && beds !== 11) { text += `, ${beds} кровать...`; }
    else if (beds % 10 >= 2 && beds % 10 <= 4) { text += `, ${beds} кровати...`; }
    else { text += `, ${beds} кроватей...`; }

    return text;
  }
}

document.querySelectorAll('.js-room-dropdown').forEach(dropdown => {
  dropdown._roomDropdown = new RoomDropdown(dropdown);
});