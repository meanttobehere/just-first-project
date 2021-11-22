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
      acceptClick: this.#handleCalendarAcceptClick.bind(this),
      clearClick: this.#handleCalendarClearClick.bind(this),
      travelChange: this.#handleCalendarTravelChange.bind(this),
    });

    this.#containers.forEach((container) => {
      container
        .addEventListener('click', this.#handleContainerClick.bind(this));
    });

    this.#updateText();
  }

  #updateText() {
    if (this.#secondText !== undefined) {
      this.#text.textContent = this.#calendar.getArrivalDate();
      this.#secondText.textContent = this.#calendar.getDepartureDate();
    } else {
      this.#text.textContent = this.#calendar.getIntervalOfArrivalAndDeparture();
    }
  }

  #handleCalendarAcceptClick() {
    this.#close();
  }

  #handleCalendarClearClick() {
    this.#close();
  }

  #handleCalendarTravelChange() {
    this.#updateText();
  }

  #handleContainerClick() {
    if (this.#isOpen) { this.#close(); } else { this.#open(); }
  }

  get #isOpen() {
    return this.#dropdown.classList.contains('date-dropdown_active');
  }

  #open() {
    this.#dropdown.classList.add('date-dropdown_active');
    document.addEventListener('click', this.#handleDocumentClick);
  }

  #close() {
    this.#dropdown.classList.remove('date-dropdown_active');
    document.removeEventListener('click', this.#handleDocumentClick);
  }

  #handleDocumentClick = (event) => {
    const dateDropdown = event.target.closest('.js-date-dropdown');
    const clickWasOutside = dateDropdown !== this.#dropdown;
    if (clickWasOutside) { this.#close(); }
  };
}

export default DateDropdown;
