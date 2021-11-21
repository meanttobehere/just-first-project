import './__item/dropdown__item';

class Dropdown {
  #dropdown;

  #clearButton;

  #acceptButton;

  #menu;

  #items;

  #field;

  constructor(dropdown) {
    this.#dropdown = dropdown;
    this.#menu = dropdown.querySelector('.js-dropdown__menu');
    this.#field = dropdown.querySelector('.js-dropdown__field');
    [...this.#items] = dropdown.querySelectorAll('.js-dropdown-item');
    [this.#clearButton, this.#acceptButton] = dropdown.querySelectorAll('.js-dropdown__button');

    this._init();
  }

  setText(text) {
    this.#field.childNodes[0].textContent = text;
  }

  getItems() {
    return this.#items.map((item) => item._dropdownItem);
  }

  _init() {
    this.#menu.addEventListener('click', this._handleMenuClick.bind(this));
    this.#field.addEventListener('click', this._handleFieldClick.bind(this));

    if (this.#clearButton !== undefined && this.#acceptButton !== undefined) {
      this.#clearButton
        .addEventListener('click', this._handleClearButtonClick.bind(this));
      this.#acceptButton
        .addEventListener('click', this._handleAcceptButtonClick.bind(this));
      this._updateClearButtonStyle();
    }
  }

  _updateClearButtonStyle() {
    const sum = this.#items
      .map((item) => item._dropdownItem.getCounterValue())
      .reduce((val1, val2) => val1 + val2);

    if (sum === 0) { this.#clearButton.classList.add('button_hide'); } else { this.#clearButton.classList.remove('button_hide'); }
  }

  _handleClearButtonClick() {
    this.#items.forEach((item) => { item._dropdownItem.reset(); });
    this._close();
  }

  _handleAcceptButtonClick() {
    this._close();
  }

  _handleMenuClick() {
    if (this.#clearButton !== undefined) { this._updateClearButtonStyle(); }
  }

  _handleFieldClick() {
    if (this._isOpen()) { this._close(); } else { this._open(); }
  }

  _isOpen() {
    return this.#dropdown.classList.contains('dropdown_active');
  }

  _open() {
    this.#dropdown.classList.add('dropdown_active');
    document.addEventListener('click', this.#handleDocumentClick);
  }

  _close() {
    this.#dropdown.classList.remove('dropdown_active');
    document.removeEventListener('click', this.#handleDocumentClick);
  }

  #handleDocumentClick = (event) => {
    const dropdown = event.target.closest('.js-dropdown');
    const clickWasOutside = dropdown !== this.#dropdown;
    if (clickWasOutside) { this._close(); }
  };
}

document.querySelectorAll('.js-dropdown').forEach((dropdown) => {
  dropdown._dropdown = new Dropdown(dropdown);
});
