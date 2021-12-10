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
      let days = ((this.#departure.getTime() - this.#arrival.getTime())
      / (1000 * 3600 * 24));
      if (days < 1) { days = 1; }
      return days;
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

    if (!Number.isNaN(arrivalDate.getTime())) {
      this.#arrival = Calendar.#getDateWithoutHours(arrivalDate);
      this.#pageMonth = arrivalDate.getMonth();
      this.#pageYear = arrivalDate.getFullYear();
    } else {
      this.#pageMonth = this.#currentDate.getMonth();
      this.#pageYear = this.#currentDate.getFullYear();
    }

    if (!Number.isNaN(departureDate.getTime())) {
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
    const clikedDate = this.#pageData[idx].d;

    if (clikedDate.getTime() < this.#currentDate.getTime()) { return; }

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
    const isPageOnCurrentMonth = this.#pageMonth === this.#currentDate.getMonth()
      && this.#pageYear === this.#currentDate.getFullYear();
    if (isPageOnCurrentMonth) { return; }

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
      } else { day.classList.add(classHidden); }
    });

    this.#title.textContent = `${Calendar.#getMonthString(this.#pageMonth)} ${this.#pageYear}`;
  }

  #renderDay(idx) {
    const day = this.#days[idx];
    const dayObj = this.#pageData[idx];

    const classes = {
      purple: 'calendar__grid-item_with-purple-circle',
      light: 'calendar__grid-item_color_light',
      green: 'calendar__grid-item_with-green-circle',
      selected: 'calendar__grid-item_selected',
      selectedLeft: 'calendar__grid-item_selected-left',
      selectedRight: 'calendar__grid-item_selected-right',
    };

    day.textContent = dayObj.day;

    if (dayObj.isArrivalDeraptureDay) day.classList.add(classes.purple);
    else day.classList.remove(classes.purple);

    if (!dayObj.isCurrentMonth) day.classList.add(classes.light);
    else day.classList.remove(classes.light);

    if (dayObj.isCurrentDay) day.classList.add(classes.green);
    else day.classList.remove(classes.green);

    if (dayObj.isBetweenArrivalDeparture) day.classList.add(classes.selected);
    else day.classList.remove(classes.selected);

    if (dayObj.isArrivalDayAndDepartureDayIsSet) {
      day.classList.add(classes.selectedLeft);
    } else day.classList.remove(classes.selectedLeft);

    if (dayObj.isDepartureDay) day.classList.add(classes.selectedRight);
    else day.classList.remove(classes.selectedRight);
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

    this.#pageData = dates.map((item) => this.#createDayObject(item));
  }

  #createDayObject(date) {
    const dayObj = {
      d: date,
      day: date.getDate(),
    };

    dayObj.isCurrentDay = Calendar.isEqualDates(date, this.#currentDate);

    dayObj.isArrivalDeraptureDay = Calendar.isEqualDates(date, this.#arrival)
     || Calendar.isEqualDates(date, this.#departure);

    dayObj.isBetweenArrivalDeparture = Calendar
      .isDateInRange(date, this.#arrival, this.#departure);

    dayObj.isCurrentMonth = date.getMonth() === this.#pageMonth;

    dayObj.isArrivalDayAndDepartureDayIsSet = this.#departure
      && Calendar.isEqualDates(date, this.#arrival)
      && !Calendar.isEqualDates(this.#arrival, this.#departure);

    dayObj.isDepartureDay = Calendar.isEqualDates(date, this.#departure)
      && !Calendar.isEqualDates(this.#arrival, this.#departure);

    return dayObj;
  }

  static #getDaysInMonth(month, year) {
    const date = new Date(year, month, 1);
    let days = 0;
    while (date.getMonth() === month) {
      days += 1;
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  static #getPrevMonthAndYear(month, year) {
    let prevYear = year;
    let prevMonth = month - 1;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear -= 1;
    }
    return ([prevMonth, prevYear]);
  }

  static #getNextMonthAndYear(month, year) {
    let nextYear = year;
    const nextMonth = (month + 1) % 12;
    if (nextMonth === 0) { nextYear += 1; }
    return ([nextMonth, nextYear]);
  }

  static #getWeekDay(date) {
    let weekDay = date.getDay() - 1;
    if (weekDay < 0) { weekDay = 6; }
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
        && date1.getTime() !== date2.getTime()) {
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
}

export default Calendar;
