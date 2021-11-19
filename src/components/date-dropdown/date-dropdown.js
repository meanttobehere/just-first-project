import '../calendar/calendar';

class DateDropdown{
  #dropdown;
  #containers;
  #text;
  #secondText;
  #calendar;

  constructor(dropdown){
    this.#dropdown = dropdown;
    this.#containers
      = dropdown.querySelectorAll('.js-date-dropdown__container');
    [this.#text, this.#secondText]
      = dropdown.querySelectorAll('.js-date-dropdown__text');
    this.#calendar = dropdown.querySelector('.js-calendar')._calendar;

    this.#calendar.setObserver({
      acceptClick: this._handleCalendarAcceptClick.bind(this),
      clearClick: this._handleCalendarClearClick.bind(this),
      travelChange: this._handleCalendarTravelChange.bind(this),
    });

    this.#containers.forEach(container => {
      container.onclick = this._handleContainerClick.bind(this);
    });

    this._handleCalendarTravelChange();
  }

  _handleCalendarAcceptClick(){
    this.#dropdown.classList.remove('date-dropdown_active');
  }

  _handleCalendarClearClick(){
    this.#dropdown.classList.remove('date-dropdown_active');
  }

  _handleCalendarTravelChange(){
    if (this.#secondText !== undefined) {
      this.#text.textContent = this.#calendar.getArrivalDate();
      this.#secondText.textContent = this.#calendar.getDepartureDate();
    } else {
      this.#text.textContent
        = this.#calendar.getIntervalOfArrivalAndDeparture();
    }
  }

  _handleContainerClick(event){
    const dropdownIsNotActive
      = this.#dropdown.classList.contains('date-dropdown_active') === false;

    if (dropdownIsNotActive){
      this.#dropdown.classList.add('date-dropdown_active');
      document.addEventListener('click', this._createDocumentClickHandler());
      event.stopPropagation();
    }
  }

  _createDocumentClickHandler(){
    const handleDocumentClick = (event) => {
      const dateDropdown = event.target.closest('.js-date-dropdown');
      const isContainer = event.target.closest('.js-date-dropdown__container');
      if (dateDropdown !== this.#dropdown 
        || dateDropdown === this.#dropdown && isContainer){
        this.#dropdown.classList.remove('date-dropdown_active');
        document.removeEventListener('click', handleDocumentClick);
      }
    }
    return handleDocumentClick;
  }
}

document.querySelectorAll('.js-date-dropdown').forEach(dropdown => {
  dropdown._dateDropdown = new DateDropdown(dropdown);
})