class Calendar {
  #title;

  #back;

  #forward;

  #clear;

  #accept;

  #days;

  #currentDate;

  #pageMonth;

  #pageYear;

  #observer;

  #pageData;

  #travelData;

  constructor(calendar) {
    this.#observer = {};
    this.#pageData = {};
    this.#travelData = {};

    this.#findHtmlElements(calendar);
    this.#bindEventHandlers();
    this.#setCurrentDate();
    this.#readDates(calendar);

    this.#renderPage();
  }

  getNumDays() {
    if (this.#arrival && this.#departure) {
      return Math.ceil(
        (this.#departure.getTime() - this.#arrival.getTime())
        / (1000 * 3600 * 24),
      );
    }
    return 0;
  }

  getArrivalDate() {
    return Calendar.#dateToString(this.#arrival);
  }

  setArrivalDate(date) {
    this.#arrival = Calendar.#getDateWithoutHours(date);
    this.#renderPage();
  }

  getDepartureDate() {
    return Calendar.#dateToString(this.#departure);
  }

  setDepartureDate(date) {
    this.#departure = Calendar.#getDateWithoutHours(date);
    this.#renderPage();
  }

  getIntervalOfArrivalAndDeparture() {
    return Calendar.#intervalToString(this.#arrival, this.#departure);
  }

  setObserver(observer) {
    this.#observer = observer;
  }

  #readDates(calendar) {
    const arrivalDate = new Date(calendar.getAttribute('data-arrival'));
    const departureDate = new Date(calendar.getAttribute('data-departure'));

    if (Calendar.isCorrectDate(arrivalDate)) {
      this.#arrival = Calendar.#getDateWithoutHours(arrivalDate);
      this.#pageMonth = arrivalDate.getMonth();
      this.#pageYear = arrivalDate.getFullYear();
    } else {
      this.#pageMonth = this.#currentDate.getMonth();
      this.#pageYear = this.#currentDate.getFullYear();
    }

    if (Calendar.isCorrectDate(departureDate)) {
      this.#departure = Calendar.#getDateWithoutHours(departureDate);
    }
  }

  #findHtmlElements(calendar) {
    this.#title = calendar.querySelector('.js-calendar__month-title');
    [
      this.#back,
      this.#forward,
    ] = calendar.querySelectorAll('.js-calendar__month-button');
    [
      this.#clear,
      this.#accept,
    ] = calendar.querySelectorAll('.js-calendar__control-button');
    this.#days = [...calendar.querySelectorAll('.js-calendar__grid-item')];
  }

  #setCurrentDate() {
    this.#currentDate = Calendar.#getDateWithoutHours(new Date());
  }

  #bindEventHandlers() {
    this.#back.addEventListener('click', this.#handleBackClick.bind(this));
    this.#forward.addEventListener('click', this.#handleForwardClick.bind(this));
    this.#clear.addEventListener('click', this.#handleClearClick.bind(this));
    this.#accept.addEventListener('click', this.#handleAcceptClick.bind(this));
    this.#days.forEach((day, idx) => {
      day.addEventListener('click', this.#handleDayClick.bind(this, idx));
    });
  }

  get #arrival() {
    return this.#travelData.arrival;
  }

  set #arrival(arrival) {
    this.#travelData.arrival = arrival;
    this.#observer.travelChange?.();
  }

  get #departure() {
    return this.#travelData.departure;
  }

  set #departure(departure) {
    this.#travelData.departure = departure;
    this.#observer.travelChange?.();
  }

  #handleDayClick(idx) {
    const clikedDate = this.#pageData[idx];

    if (clikedDate.getTime() < this.#currentDate.getTime()) {
      return;
    }

    const isArrivalCanBeSetByClickedDate = !this.#arrival
      || this.#departure
      || this.#arrival.getTime() > clikedDate.getTime();

    if (isArrivalCanBeSetByClickedDate) {
      this.#arrival = clikedDate;
      this.#departure = null;
    } else {
      this.#departure = clikedDate;
    }

    this.#renderPage();
  }

  #handleAcceptClick() {
    this.#observer.acceptClick?.();
  }

  #handleClearClick() {
    this.#arrival = null;
    this.#departure = null;

    this.#pageMonth = this.#currentDate.getMonth();
    this.#pageYear = this.#currentDate.getFullYear();

    this.#renderPage();

    this.#observer.clearClick?.();
  }

  #handleBackClick() {
    [this.#pageMonth, this.#pageYear] = Calendar
      .#getPrevMonthAndYear(this.#pageMonth, this.#pageYear);

    this.#renderPage();
  }

  #handleForwardClick() {
    [this.#pageMonth, this.#pageYear] = Calendar
      .#getNextMonthAndYear(this.#pageMonth, this.#pageYear);
    this.#renderPage();
  }

  #renderPage() {
    this.#updatePageData();

    const classHidden = 'calendar__grid-item_hidden';

    this.#days.forEach((day, idx) => {
      if (idx < this.#pageData.length) {
        day.classList.remove(classHidden);
        this.#renderDay(idx);
      } else {
        day.classList.add(classHidden);
      }
    });

    this.#title.textContent = `${Calendar.#getMonthString(this.#pageMonth)} ${this.#pageYear}`;
  }

  #renderDay(idx) {
    const day = this.#days[idx];
    const date = this.#pageData[idx];
    const dayConditionValues = this.#getDayConditionValues(date);

    const classes = [
      {
        name: 'calendar__grid-item_with-purple-circle',
        isRequired: dayConditionValues.isArrivalDeraptureDay,
      },
      {
        name: 'calendar__grid-item_color_light',
        isRequired: !dayConditionValues.isCurrentMonth,
      },
      {
        name: 'calendar__grid-item_with-green-circle',
        isRequired: dayConditionValues.isCurrentDay,
      },
      {
        name: 'calendar__grid-item_selected',
        isRequired: dayConditionValues.isBetweenArrivalDeparture,
      },
      {
        name: 'calendar__grid-item_selected-left',
        isRequired: dayConditionValues.isArrivalDayAndDepartureDayIsSet,
      },
      {
        name: 'calendar__grid-item_selected-right',
        isRequired: dayConditionValues.isDepartureDay,
      },
      {
        name: 'calendar__grid-item_not-clickable',
        isRequired: dayConditionValues.isBeforeCurrentDay,
      }
    ];

    day.textContent = date.getDate();
    classes.forEach((cssClass) => {
      if (cssClass.isRequired) {
        day.classList.add(cssClass.name);
      } else {
        day.classList.remove(cssClass.name);
      }
    });
  }

  #updatePageData() {
    const numDaysPageMonth = Calendar
      .#getDaysInMonth(this.#pageMonth, this.#pageYear);

    const weekDayFirstDay = Calendar
      .#getWeekDay(new Date(this.#pageYear, this.#pageMonth, 1));

    const numDates = Math.ceil((weekDayFirstDay + numDaysPageMonth) / 7) * 7;
    const date = new Date(this.#pageYear, this.#pageMonth, 1 - weekDayFirstDay);
    const dates = [];

    while (dates.length < numDates) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    this.#pageData = dates;
  }

  #getDayConditionValues(date) {
    return ({
      isCurrentDay: Calendar.isEqualDates(date, this.#currentDate),
      isArrivalDeraptureDay: Calendar.isEqualDates(date, this.#arrival)
        || Calendar.isEqualDates(date, this.#departure),
      isBetweenArrivalDeparture: Calendar
        .isDateInRange(date, this.#arrival, this.#departure),
      isCurrentMonth: date.getMonth() === this.#pageMonth,
      isArrivalDayAndDepartureDayIsSet: this.#departure
        && Calendar.isEqualDates(date, this.#arrival)
        && !Calendar.isEqualDates(this.#arrival, this.#departure),
      isDepartureDay: Calendar.isEqualDates(date, this.#departure)
        && !Calendar.isEqualDates(this.#arrival, this.#departure),
      isBeforeCurrentDay: date.getTime() < this.#currentDate.getTime(),
    });
  }

  static #getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  static #getPrevMonthAndYear(month, year) {
    const date = new Date(year, month, 0);
    return ([date.getMonth(), date.getFullYear()]);
  }

  static #getNextMonthAndYear(month, year) {
    const nextMonth = (month + 1) % 12;
    const nextYear = nextMonth === 0 ? year + 1 : year;
    return ([nextMonth, nextYear]);
  }

  static #getWeekDay(date) {
    const weekDay = (date.getDay() === 0) ? 6 : date.getDay() - 1;
    return weekDay;
  }

  static #getMonthString(month) {
    const months = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
    ];
    return months[month];
  }

  static #dateToString(date) {
    if (date instanceof Date) {
      return `${date.toLocaleDateString('ru')}`;
    }
    return 'ДД.ММ.ГГГГ';
  }

  static #intervalToString(date1, date2) {
    const getLocalString = (date) => date
      .toLocaleString('ru', { month: 'short', day: 'numeric' }).slice(0, -1);

    if (date1 instanceof Date && date2 instanceof Date
        && !Calendar.isEqualDates(date1, date2)) {
      return `${getLocalString(date1)} - ${getLocalString(date2)}`;
    } if (date1 instanceof Date) {
      return `${getLocalString(date1)}`;
    }
    return 'Время проживания';
  }

  static #getDateWithoutHours(date) {
    return (new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  }

  static isEqualDates(date1, date2) {
    return (date1 instanceof Date
      && date2 instanceof Date
      && date1.getTime() === date2.getTime());
  }

  static isDateInRange(date, dateFrom, dateTo) {
    return (date instanceof Date
      && dateFrom instanceof Date
      && dateTo instanceof Date
      && date.getTime() > dateFrom.getTime()
      && date.getTime() < dateTo.getTime());
  }

  static isCorrectDate(date) {
    return !Number.isNaN(date.getTime());
  }
}

export default Calendar;
