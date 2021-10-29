import { getCalendar } from '../calendar/calendar';

function dateDropdownsInit() {
  document.addEventListener('click', (event) => {
    const dateDropdownContainer = event.target.closest('.js-date-dropdown__container');
    const currentDateDropdown = event.target.closest('.js-date-dropdown');

    if (!dateDropdownContainer && currentDateDropdown) return;

    if (dateDropdownContainer) { currentDateDropdown.classList.toggle('date-dropdown_active'); }

    document.querySelectorAll('.js-date-dropdown.date-dropdown_active').forEach((dateDropdown) => {
      if (dateDropdown === currentDateDropdown) return;
      dateDropdown.classList.remove('date-dropdown_active');
    });
  });

  const dropdowns = document.getElementsByClassName('js-date-dropdown');

  for (let i = 0; i < dropdowns.length; i += 1) {
    const dropdown = dropdowns[i];

    const calendarDOM = dropdown.querySelector('.js-calendar');
    const calendar = getCalendar(calendarDOM);

    const [text, secondText] = dropdown.getElementsByClassName('date-dropdown__text');

    const acceptButtonClickHandler = function acceptButtonClickHandler() {
      dropdown.classList.remove('date-dropdown_active');
    };

    const clearButtonClickHandler = function clearButtonClickHandler() {
      dropdown.classList.remove('date-dropdown_active');
    };

    const travelChangeHandler = function travelChangeHandler() {
      if (secondText !== undefined) {
        text.textContent = calendar.getArrivalDate();
        secondText.textContent = calendar.getDepartureDate();
      } else {
        text.textContent = calendar.getIntervalOfArrivalAndDeparture();
      }
    };

    travelChangeHandler();

    calendar.setObserver({
      acceptClick: acceptButtonClickHandler,
      clearClick: clearButtonClickHandler,
      travelChange: travelChangeHandler,
    });
  }
}

dateDropdownsInit();
