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
    this.#filterContainer.classList.toggle('search-page__filter-container_open');
    const filterContainerIsOpen = this.#filterContainer
      .classList.contains('search-page__filter-container_open');
    if (filterContainerIsOpen) {
      this.#footer.style.display = 'none';
      this.#dataContainer.style.display = 'none';
      window.scrollTo(0, 0);
    } else {
      this.#footer.style.display = 'block';
      this.#dataContainer.style.display = 'flex';
    }
  }
}

export default SearchPage;
