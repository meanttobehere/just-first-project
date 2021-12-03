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
    return this.#list.classList.contains('checkbox-list_open');
  }

  #open() {
    this.#list.classList.add('checkbox-list_open');
    document.addEventListener('click', this.#handleDocumentClick);
  }

  #close() {
    this.#list.classList.remove('checkbox-list_open');
    document.removeEventListener('click', this.#handleDocumentClick);
  }

  #handleDocumentClick = (event) => {
    const list = event.target.closest('.js-checkbox-list');
    const clickWasOutside = list !== this.#list;
    if (clickWasOutside) { this.#close(); }
  };
}

export default CheckboxList;
