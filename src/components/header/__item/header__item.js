class HeaderItem{
  #item;

  constructor(item){
    this.#item = item;
    item
      .querySelector('.js-header-item__title-container')
      .addEventListener('click', this._handleTitleClick.bind(this));
  }

  _open(){
    this.#item.classList.add('header-item_open');
  }

  _close(){
    this.#item.classList.remove('header-item_open');
  }

  _isOpen(){
    return this.#item.classList.contains('header-item_open') === true;
  }

  _handleTitleClick(event){
    const itemIsNotOpen = this._isOpen() === false;

    if (itemIsNotOpen){
      this._open();
      document.addEventListener('click', this._createDocumentClickHandler());
      event.stopPropagation();
    }
  }

  _createDocumentClickHandler(){
    const handleDocumentClick = (event) => {
      const item = event.target.closest('.js-header-item');
      const isTitle = event.target.closest('.js-header-item__title-container');
      if (item !== this.#item
        || item === this.#item && isTitle){
        this._close();
        document.removeEventListener('click', handleDocumentClick);
      }
    }
    return handleDocumentClick;
  }
}

document.querySelectorAll('.js-header-item').forEach(item => {
  item._headerItem = new HeaderItem(item);
})