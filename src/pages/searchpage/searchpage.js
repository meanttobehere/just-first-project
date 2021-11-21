import '../../components/header/header';
import '../../components/footer/footer';
import '../../components/date-dropdown/date-dropdown';
import '../../components/guests-dropdown/guests-dropdown';
import '../../components/range-slider/range-slider';
import '../../components/room-dropdown/room-dropdown';
import '../../components/checkbox-list/checkbox-list';
import '../../components/room-card/room-card';
import '../../resources/images/room-photo1.jpg';
import '../../resources/images/room-photo2.jpg';
import '../../resources/images/room-photo3.jpg';
import '../../resources/images/room-photo4.jpg';
import '../../resources/images/room-photo5.jpg';
import '../../resources/images/room-photo6.jpg';
import '../../resources/images/room-photo7.jpg';
import '../../resources/images/room-photo8.jpg';
import '../../resources/images/room-photo9.jpg';
import '../../resources/images/room-photo10.jpg';
import '../../resources/images/room-photo11.jpg';
import '../../resources/images/room-photo12.jpg';
import './searchpage.scss';

class Searchpage {
  #filter;

  #filterContainer;

  #footer;

  #dataContainer;

  constructor(searchpage) {
    this.#filter = searchpage.querySelector('.js-searchpage__filter');
    this.#filterContainer = searchpage
      .querySelector('.js-searchpage__filter-container');
    this.#footer = searchpage.querySelector('.js-searchpage__footer');
    this.#dataContainer = searchpage
      .querySelector('.js-searchpage__data-container');

    this.#filter.addEventListener('click', this.#handleFilterClick.bind(this));
  }

  #handleFilterClick() {
    this.#filterContainer.classList.toggle('searchpage__filter-container_open');
    const filterContainerIsOpen = this.#filterContainer
      .classList.contains('searchpage__filter-container_open');
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

/* eslint-disable-next-line */
const searchpage = new Searchpage(document.querySelector('.searchpage'));
