class HeaderItem {
  #item;

  #title;

  constructor(item) {
    this.#item = item;
    this.#title = item.querySelector('.js-header-item__title-container');

    this.#title.addEventListener('click', this.#handleTitleClick.bind(this));
  }

  #open() {
    this.#item.classList.add('header-item_open');
    document.addEventListener('click', this.#handleDocumentClick);
  }

  #close() {
    this.#item.classList.remove('header-item_open');
    document.removeEventListener('click', this.#handleDocumentClick);
  }

  get #isOpen() {
    return this.#item.classList.contains('header-item_open') === true;
  }

  #handleTitleClick() {
    if (this.#isOpen) { this.#close(); } else { this.#open(); }
  }

  #handleDocumentClick = (event) => {
    const item = event.target.closest('.js-header-item');
    const clickWasOutside = item !== this.#item;
    if (clickWasOutside) { this.#close(); }
  };
}

export default HeaderItem;
