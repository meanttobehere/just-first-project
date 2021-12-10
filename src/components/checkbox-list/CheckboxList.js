class CheckboxList {
  #list;

  #title;

  constructor(list) {
    this.#list = list;
    this.#title = list.querySelector('.js-checkbox-list__title');
    this.#init();
  }

  #init() {
    this.#title.onclick = this.#handleTitleClick.bind(this);
    if (this.#isOpen) {
      document.addEventListener('click', this.#handleDocumentClick);
    }
  }

  #handleTitleClick() {
    if (this.#isOpen) { this.#close(); } else { this.#open(); }
  }

  get #isOpen() {
    return this.#list.classList.contains(CheckboxList.#classOpen);
  }

  #open() {
    this.#list.classList.add(CheckboxList.#classOpen);
    document.addEventListener('click', this.#handleDocumentClick);
  }

  #close() {
    this.#list.classList.remove(CheckboxList.#classOpen);
    document.removeEventListener('click', this.#handleDocumentClick);
  }

  #handleDocumentClick = (event) => {
    const list = event.target.closest('.js-checkbox-list');
    const isClickOutside = list !== this.#list;
    if (isClickOutside) { this.#close(); }
  };

  static #classOpen = 'checkbox-list_open';
}

export default CheckboxList;
