import '../calendar/calendar';

class DateDropdown {
  #dropdown;

  #containers;

  #text;

  #secondText;

  #calendar;

  #handleDocumentClick;

  constructor(dropdown) {
    this.#dropdown = dropdown;
    this.#containers = dropdown.querySelectorAll('.js-date-dropdown__container');
    [this.#text, this.#secondText] = dropdown.querySelectorAll('.js-date-dropdown__text');
    this.#calendar = dropdown.querySelector('.js-calendar')._calendar;

    this._init();
  }

  _init() {
    this.#calendar.setObserver({
      acceptClick: this._handleCalendarAcceptClick.bind(this),
      clearClick: this._handleCalendarClearClick.bind(this),
      travelChange: this._handleCalendarTravelChange.bind(this),
    });

    this.#containers.forEach((container) => {
      container
        .addEventListener('click', this._handleContainerClick.bind(this));
    });

    this._initDocumentClickHandler();
    this._updateText();
  }

  _updateText() {
    if (this.#secondText !== undefined) {
      this.#text.textContent = this.#calendar.getArrivalDate();
      this.#secondText.textContent = this.#calendar.getDepartureDate();
    } else {
      this.#text.textContent = this.#calendar.getIntervalOfArrivalAndDeparture();
    }
  }

  _handleCalendarAcceptClick() {
    this._close();
  }

  _handleCalendarClearClick() {
    this._close();
  }

  _handleCalendarTravelChange() {
    this._updateText();
  }

  _handleContainerClick() {
    if (this._isOpen()) { this._close(); } else { this._open(); }
  }

  _isOpen() {
    return this.#dropdown.classList.contains('date-dropdown_active');
  }

  _open() {
    this.#dropdown.classList.add('date-dropdown_active');
    document.addEventListener('click', this.#handleDocumentClick);
  }

  _close() {
    this.#dropdown.classList.remove('date-dropdown_active');
    document.removeEventListener('click', this.#handleDocumentClick);
  }

  _initDocumentClickHandler() {
    this.#handleDocumentClick = (event) => {
      const dateDropdown = event.target.closest('.js-date-dropdown');
      const clickWasOutside = dateDropdown !== this.#dropdown;
      if (clickWasOutside) { this._close(); }
    };
  }
}

document.querySelectorAll('.js-date-dropdown').forEach((dropdown) => {
  dropdown._dateDropdown = new DateDropdown(dropdown);
});
