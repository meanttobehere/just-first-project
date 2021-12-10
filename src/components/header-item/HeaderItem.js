class HeaderItem {
  #item;

  #title;

  constructor(item) {
    this.#item = item;
    this.#title = item.querySelector('.js-header-item__title');
    this.#title.addEventListener('click', this.#handleTitleClick.bind(this));
  }

  #open() {
    this.#item.classList.add(HeaderItem.#classOpen);
    document.addEventListener('click', this.#handleDocumentClick);
  }

  #close() {
    this.#item.classList.remove(HeaderItem.#classOpen);
    document.removeEventListener('click', this.#handleDocumentClick);
  }

  get #isOpen() {
    return this.#item.classList.contains(HeaderItem.#classOpen) === true;
  }

  #handleTitleClick() {
    if (this.#isOpen) { this.#close(); } else { this.#open(); }
  }

  #handleDocumentClick = (event) => {
    const item = event.target.closest('.js-header-item');
    const isClickOutside = item !== this.#item;
    if (isClickOutside) { this.#close(); }
  };

  static #classOpen = 'header-item_open';
}

export default HeaderItem;
