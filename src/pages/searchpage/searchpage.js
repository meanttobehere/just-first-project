import './searchpage.scss';
import '../../components/header/header.js';
import '../../components/footer/footer.js';
import '../../components/guests-dropdown/guests-dropdown.js';
import '../../components/dropdown/dropdown.js';
import '../../components/range-slider/range-slider.js';
import '../../components/checkbox-list/checkbox-list.js';
import '../../components/room-dropdown/room-dropdown.js';

function searchPageInit(){
    const filterControl = document.querySelector('.js-filter-control');
    const filterContainer = document.querySelector('.js-filter-container');

    filterControl.addEventListener('click', () => {
        filterContainer.classList.toggle('filter-container_open');
    })
}

searchPageInit();