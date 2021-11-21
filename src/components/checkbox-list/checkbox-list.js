class CheckboxList {
  #list;

  constructor(list) {
    this.#list = list;
    const title = list.querySelector('.js-checkbox-list__title');
    title.onclick = this._handleTitleClick.bind(this);
  }

  _handleTitleClick() {
    this.#list.classList.toggle('checkbox-list_open');
  }
}

document
  .querySelectorAll('.js-checkbox-list.checkbox-list_expandable')
  .forEach((list) => {
    list._checkboxList = new CheckboxList(list);
  });
