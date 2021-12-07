class SearchPage {
  #filter;

  #filterContainer;

  #footer;

  #dataContainer;

  constructor(searchpage) {
    this.#filter = searchpage.querySelector('.js-search-page__filter');
    this.#filterContainer = searchpage
      .querySelector('.js-search-page__filter-container');
    this.#footer = searchpage.querySelector('.js-search-page__footer');
    this.#dataContainer = searchpage
      .querySelector('.js-search-page__data-container');

    this.#filter.addEventListener('click', this.#handleFilterClick.bind(this));
  }

  #handleFilterClick() {
    if (this.#filterContainerIsOpen()) {
      this.#closeFilterContainer();
    } else {
      this.#openFilterContainer();
    }
  }

  #openFilterContainer() {
    this.#filterContainer.classList.add('search-page__filter-container_open');
    this.#footer.style.display = 'none';
    this.#dataContainer.style.display = 'none';
    window.scrollTo(0, 0);
  }

  #closeFilterContainer() {
    this.#filterContainer.classList.remove('search-page__filter-container_open');
    this.#footer.style.display = 'block';
    this.#dataContainer.style.display = 'flex';
  }

  #filterContainerIsOpen() {
    return (this.#filterContainer
      .classList.contains('search-page__filter-container_open'));
  }
}

export default SearchPage;
