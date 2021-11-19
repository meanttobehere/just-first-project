import './searchpage.scss';

import '../../components/header/header';
import '../../components/footer/footer';
import '../../components/date-dropdown/date-dropdown';
import '../../components/guests-dropdown/guests-dropdown';
import '../../components/range-slider/range-slider';
import '../../components/room-dropdown/room-dropdown';
import '../../components/checkbox-list/checkbox-list';
import '../../components/room-card/room-card';

import '../../resources/images/room_photo1.jpg';
import '../../resources/images/room_photo2.jpg';
import '../../resources/images/room_photo3.jpg';
import '../../resources/images/room_photo4.jpg';
import '../../resources/images/room_photo5.jpg';
import '../../resources/images/room_photo6.jpg';
import '../../resources/images/room_photo7.jpg';
import '../../resources/images/room_photo8.jpg';
import '../../resources/images/room_photo9.jpg';
import '../../resources/images/room_photo10.jpg';
import '../../resources/images/room_photo11.jpg';
import '../../resources/images/room_photo12.jpg';

class Searchpage{
  #filter;
  #filterContainer;
  #footer;
  #dataContainer;

  constructor(searchpage){
    this.#filter = searchpage.querySelector('.js-searchpage__filter');
    this.#filterContainer = searchpage
      .querySelector('.js-searchpage__filter-container');
    this.#footer = searchpage.querySelector('.js-searchpage__footer');
    this.#dataContainer = searchpage
      .querySelector('.js-searchpage__data-container');

    this.#filter.addEventListener('click', this._handleFilterClick.bind(this));
  }

  _handleFilterClick(){
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

new Searchpage(document.querySelector('.searchpage'));