class CheckboxList {
  #list;

  constructor(list) {
    this.#list = list;
    const title = list.querySelector('.js-checkbox-list__title');
    title.onclick = this.#handleTitleClick.bind(this);
  }

  #handleTitleClick() {
    this.#list.classList.toggle('checkbox-list_open');
  }
}

document
  .querySelectorAll('.js-checkbox-list.checkbox-list_expandable')
  .forEach((list) => {
    const listDOM = list;
    listDOM.checkboxList = new CheckboxList(list);
  });
