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

export default CheckboxList;
