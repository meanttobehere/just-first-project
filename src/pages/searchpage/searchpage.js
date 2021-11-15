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

function searchPageInit() {
  const filterControl = document.querySelector('.js-filter-control');
  const filterContainer = document.querySelector('.js-filter-container');
  const footer = document.querySelector('.js-footer');
  const data = document.querySelector('.js-data-container');

  let stateIsOpen = true;
  filterControl.addEventListener('click', () => {
    filterContainer.classList.toggle('filter-container_open');
    if (stateIsOpen) {
      footer.style.display = 'none';
      data.style.display = 'none';
      window.scrollTo(0, 0);
    } else {
      footer.style.display = 'block';
      data.style.display = 'flex';
    }
    stateIsOpen = !stateIsOpen;
  });
}

searchPageInit();