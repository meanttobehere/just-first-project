import '../dropdown/dropdown';

class GuestsDropdown{
  #dropdown;

  constructor(guestsDropdown){
    this.#dropdown = guestsDropdown.querySelector('.js-dropdown')._dropdown;
    guestsDropdown
      .querySelector('.js-dropdown__menu')
      .addEventListener('click', this._handleMenuClick.bind(this));
  }

  _handleMenuClick(){
    const [
      adults,
      children,
      babies
    ] = this.#dropdown.getItems().map(item => item.getCounterValue());
    this.#dropdown.setText(this._generateText(adults, children, babies));
  }

  _generateText(adults, children, babies){
    let text = '';
    const guests = adults + children + babies;

    if (guests === 0) { return ('Сколько гостей'); }

    if (guests % 10 === 1 && guests !== 11) { text = `${guests} гость`; }
    else if (guests % 10 >= 2 && guests % 10 <= 4) { text = `${guests} гостя`; }
    else { text = `${guests} гостей`; }

    if (babies === 0) { return text; }

    if (babies % 10 === 1 && babies !== 11) { text += `, ${babies} младенец`; }
    else if (babies % 10 >= 2 && babies % 10 <= 4)
      { text += `, ${babies} младенца`; }
    else { text += `, ${babies} младенцев`; }

    return text;
  }
}

document.querySelectorAll('.js-guests-dropdown').forEach(dropdown => {
  dropdown._guestsDropdown = new GuestsDropdown(dropdown);
});