class HeaderItem{
  #item;
  #eventBubblesUpFromTitle;

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
      this.#eventBubblesUpFromTitle = true;
      document.addEventListener('click', this._makeDocumentClickHandler());
    }
  }

  _makeDocumentClickHandler(){
    const handleDocumentClick = (event) => {
      if (this.#eventBubblesUpFromTitle === true) {
        this.#eventBubblesUpFromTitle = false;
        return;
      }
      const item = event.target.closest('.js-header-item');
      const title = event.target.closest('.js-header-item__title-container');
      const clickWasOutside = item !== this.#item;
      const clickWasOnTitle = item === this.#item && title;
      if (clickWasOutside || clickWasOnTitle) {
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