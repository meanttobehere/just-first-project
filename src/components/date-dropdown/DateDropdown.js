class DateDropdown {
  #dropdown;

  #containers;

  #text;

  #secondText;

  #calendar;

  constructor(dropdown) {
    this.#dropdown = dropdown;
    this.#containers = dropdown.querySelectorAll('.js-date-dropdown__container');
    [
      this.#text,
      this.#secondText,
    ] = dropdown.querySelectorAll('.js-date-dropdown__text');
    this.#calendar = dropdown.querySelector('.js-calendar').calendar;

    this.#init();
  }

  #init() {
    this.#calendar.setObserver({
      acceptClick: this.#handleCalendarAcceptOrClearClick.bind(this),
      clearClick: this.#handleCalendarAcceptOrClearClick.bind(this),
      travelChange: this.#handleCalendarTravelChange.bind(this),
    });

    this.#containers.forEach((container) => {
      container.addEventListener('click', this.#handleContainerClick.bind(this));
    });

    this.#updateText();
  }

  #updateText() {
    if (this.#secondText) {
      this.#text.textContent = this.#calendar.getArrivalDate();
      this.#secondText.textContent = this.#calendar.getDepartureDate();
    } else {
      this.#text.textContent = this.#calendar.getIntervalOfArrivalAndDeparture();
    }
  }

  #handleCalendarAcceptOrClearClick() {
    this.#close();
  }

  #handleCalendarTravelChange() {
    this.#updateText();
  }

  #handleContainerClick() {
    if (this.#isOpen) {
      this.#close();
    } else {
      this.#open();
    }
  }

  get #isOpen() {
    return this.#dropdown.classList.contains(DateDropdown.#classActive);
  }

  #open() {
    this.#dropdown.classList.add(DateDropdown.#classActive);
    document.addEventListener('click', this.#handleDocumentClick);
  }

  #close() {
    this.#dropdown.classList.remove(DateDropdown.#classActive);
    document.removeEventListener('click', this.#handleDocumentClick);
  }

  #handleDocumentClick = (event) => {
    const dateDropdown = event.target.closest('.js-date-dropdown');
    const isClickOutside = dateDropdown !== this.#dropdown;
    if (isClickOutside) {
      this.#close();
    }
  };

  static #classActive = 'date-dropdown_active';
}

export default DateDropdown;
