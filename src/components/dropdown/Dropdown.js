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
    [
      this.#clearButton,
      this.#acceptButton,
    ] = dropdown.querySelectorAll('.js-dropdown__button');

    this.#init();
  }

  setText(text) {
    this.#field.setAttribute('value', text);
  }

  getItems() {
    return this.#items.map((item) => item.dropdownItem);
  }

  #init() {
    this.#menu.addEventListener('click', this.#handleMenuClick.bind(this));
    this.#field.addEventListener('click', this.#handleFieldClick.bind(this));

    if (this.#clearButton !== undefined && this.#acceptButton !== undefined) {
      this.#clearButton
        .addEventListener('click', this.#handleClearButtonClick.bind(this));
      this.#acceptButton
        .addEventListener('click', this.#handleAcceptButtonClick.bind(this));
      this.#updateClearButtonStyle();
    }
  }

  #updateClearButtonStyle() {
    const sum = this.#items
      .map((item) => item.dropdownItem.getCounterValue())
      .reduce((val1, val2) => val1 + val2);

    if (sum === 0) {
      this.#clearButton.classList.add(Dropdown.#classButtonHidden);
    } else {
      this.#clearButton.classList.remove(Dropdown.#classButtonHidden);
    }
  }

  #handleClearButtonClick() {
    this.#items.forEach((item) => { item.dropdownItem.reset(); });
    this.#close();
  }

  #handleAcceptButtonClick() {
    this.#close();
  }

  #handleMenuClick() {
    if (this.#clearButton !== undefined) { this.#updateClearButtonStyle(); }
  }

  #handleFieldClick() {
    if (this.#isOpen) { this.#close(); } else { this.#open(); }
  }

  get #isOpen() {
    return this.#dropdown.classList.contains(Dropdown.#classActive);
  }

  #open() {
    this.#dropdown.classList.add(Dropdown.#classActive);
    document.addEventListener('click', this.#handleDocumentClick);
  }

  #close() {
    this.#dropdown.classList.remove(Dropdown.#classActive);
    document.removeEventListener('click', this.#handleDocumentClick);
  }

  #handleDocumentClick = (event) => {
    const dropdown = event.target.closest('.js-dropdown');
    const clickWasOutside = dropdown !== this.#dropdown;
    if (clickWasOutside) { this.#close(); }
  };

  static #classActive = 'dropdown_active';

  static #classButtonHidden = 'dropdown__button_hidden';
}

export default Dropdown;
