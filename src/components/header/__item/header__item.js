class HeaderItem{
  #item;
  #title;
  #handleDocumentClick;

  constructor(item){
    this.#item = item;
    this.#title = item.querySelector('.js-header-item__title-container');

    this._init();
  }

  _init(){
    this.#title.addEventListener('click', this._handleTitleClick.bind(this));
    this._initDocumentClickHandler();
  }

  _open(){
    this.#item.classList.add('header-item_open');
    document.addEventListener('click', this.#handleDocumentClick);
  }

  _close(){
    this.#item.classList.remove('header-item_open');
    document.removeEventListener('click', this.#handleDocumentClick);
  }

  _isOpen(){
    return this.#item.classList.contains('header-item_open') === true;
  }

  _handleTitleClick(){
    if (this._isOpen()) { this._close(); } else { this._open(); }
  }

  _initDocumentClickHandler(){
    this.#handleDocumentClick = (event) => {
      const item = event.target.closest('.js-header-item');
      const clickWasOutside = item !== this.#item;
      if (clickWasOutside) { this._close(); }
    }
  }
}

document.querySelectorAll('.js-header-item').forEach(item => {
  item._headerItem = new HeaderItem(item);
})