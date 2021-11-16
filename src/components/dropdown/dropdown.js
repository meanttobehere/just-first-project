import './__item/dropdown__item';

class Dropdown{
  #dropdown;
  #clearButton;
  #acceptButton;
  #menu;
  #items;
  #field;

  constructor(dropdown){
    this.#dropdown = dropdown;
    this.#menu = dropdown.querySelector('.js-dropdown__menu');
    this.#field = dropdown.querySelector('.js-dropdown__field');
    [...this.#items] = dropdown.querySelectorAll('.js-dropdown-item');

    this.#menu.onclick = this._handleMenuClick.bind(this);
    this.#field.onclick = this._handleFieldClick.bind(this);

    const buttonsContainer = dropdown.querySelector('.js-dropdown__buttons-container');
    if (buttonsContainer){
      [this.#clearButton, this.#acceptButton] = buttonsContainer.children;
      this.#clearButton.onclick = this._handleClearButtonClick.bind(this);
      this.#acceptButton.onclick = this._handleAcceptButtonClick.bind(this);
      this._updateClearButtonStyle();
    }
  }

  setText(text){
    this.#field.childNodes[0].textContent = text;
  }

  getItems(){
    return this.#items.map(item => item._dropdownItem);
  }

  _close(){
    this.#dropdown.classList.remove('dropdown_active');
  }

  _open(){
    this.#dropdown.classList.add('dropdown_active');
  }

  _updateClearButtonStyle(){
    const sum = this.#items
      .map(item => item._dropdownItem.getCounterValue())
      .reduce((val1, val2) => val1 + val2);
 
    if (sum === 0) { this.#clearButton.classList.add('button_hide'); } 
    else { this.#clearButton.classList.remove('button_hide'); }
  }

  _handleClearButtonClick(){
    this.#items.forEach(item => { item._dropdownItem.reset(); });
    this._close();
  }

  _handleAcceptButtonClick(){
    this._close();
  }

  _handleMenuClick(){
    if (this.#clearButton){
      this._updateClearButtonStyle();
    }
  }

  _handleFieldClick(event){
    const dropdownIsNotActive = this.#dropdown.classList.contains('dropdown_active') === false;

    if (dropdownIsNotActive){
      this._open();
      document.addEventListener('click', this._createDocumentClickHandler());
      event.stopPropagation();
    }
  }

  _createDocumentClickHandler(){
    const handleDocumentClick = (event) => {
      const dropdown = event.target.closest('.js-dropdown');
      const isField = event.target.closest('.js-dropdown__field');
      if (dropdown !== this.#dropdown
        || dropdown === this.#dropdown && isField){
        this._close();
        document.removeEventListener('click', handleDocumentClick);
      }
    }
    return handleDocumentClick;
  }
}

document.querySelectorAll('.js-dropdown').forEach(dropdown => {
  dropdown._dropdown = new Dropdown(dropdown);
});