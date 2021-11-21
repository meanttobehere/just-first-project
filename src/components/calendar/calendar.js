class Calendar {
  #title;

  #back;

  #forward;

  #clear;

  #accept;

  #days;

  #currentDate;

  #month;

  #day;

  #year;

  #observer;

  #pageData;

  #travelData;

  constructor(calendar) {
    this.#observer = {};
    this.#pageData = {};
    this.#travelData = { arrival: false, departure: false };

    this.#findHtmlElements(calendar);
    this.#readDates(calendar);
    this.#bindEventHandlers();
    this.#setCurrentDate();

    this.#renderPage();
  }

  getNumDays() {
    if (this.#arrival instanceof Date && this.#departure instanceof Date) {
      return ((this.#departure.getTime() - this.#arrival.getTime())
        / (1000 * 3600 * 24) + 1);
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
      this.setArrivalDate(arrivalDate);
    }

    if (!Number.isNaN(departureDate.getTime())) {
      this.setDepartureDate(departureDate);
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
    const currentDate = new Date();
    this.#month = currentDate.getMonth();
    this.#year = currentDate.getFullYear();
    this.#day = currentDate.getDate();
    this.#currentDate = new Date(this.#year, this.#month, this.#day);
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

    if (clikedDate < +this.#currentDate) { return; }

    if (this.#arrival === false
      || this.#arrival > clikedDate
      || (this.#arrival !== false
      && this.#departure !== false)) {
      this.#arrival = clikedDate;
      this.#departure = false;
    } else {
      this.#departure = clikedDate;
    }

    this.#renderPage();
  }

  #handleAcceptClick() {
    this.#observer.acceptClick?.();
  }

  #handleClearClick() {
    this.#arrival = {};
    this.#departure = {};

    this.#month = this.#currentDate.getMonth();
    this.#year = this.#currentDate.getFullYear();

    this.#renderPage();

    this.#observer.clearClick?.();
  }

  #handleBackClick() {
    const date = new Date();
    const mmm = date.getMonth();
    const yyy = date.getFullYear();

    if (this.#month === mmm && this.#year === yyy) { return; }

    this.#month -= 1;
    if (this.#month < 0) {
      this.#month = 11;
      this.#year -= 1;
    }

    this.#renderPage();
  }

  #handleForwardClick() {
    this.#month += 1;
    if (this.#month > 11) {
      this.#month = 0;
      this.#year += 1;
    }

    this.#renderPage();
  }

  #renderPage() {
    this.#updatePageData();

    this.#days.forEach((day, idx) => {
      if (idx < this.#pageData.length) {
        day.classList.remove('calendar__grid-item_hidden');
        this.#renderDay(idx);
      } else { day.classList.add('calendar__grid-item_hidden'); }
    });

    this.#title.textContent = `${Calendar.#getMonthString(this.#month)} ${this.#year}`;
  }

  #renderDay(idx) {
    const day = this.#days[idx];
    const dayObj = this.#pageData[idx];

    day.textContent = dayObj.day;

    if (dayObj.isArrivalDeraptureDay) {
      day.classList.add('calendar__grid-item_arrival-departure-date');
    } else {
      day.classList.remove('calendar__grid-item_arrival-departure-date');
    }

    if (dayObj.isCurrentMonth === false) {
      day.classList.add('calendar__grid-item_not-current-month-date');
    } else {
      day.classList.remove('calendar__grid-item_not-current-month-date');
    }

    if (dayObj.isCurrentDay) {
      day.classList.add('calendar__grid-item_current-date');
    } else {
      day.classList.remove('calendar__grid-item_current-date');
    }

    if (dayObj.isBetweenArrivalDeparture) {
      day.classList.add('calendar__grid-item_between-arival-departure-date');
    } else {
      day.classList
        .remove('calendar__grid-item_between-arival-departure-date');
    }

    if (dayObj.isArrivalDay) {
      day.classList.add('calendar__grid-item_arrival-day-set');
    } else {
      day.classList.remove('calendar__grid-item_arrival-day-set');
    }

    if (dayObj.isDepartureDay) {
      day.classList.add('calendar__grid-item_departure-day-set');
    } else {
      day.classList.remove('calendar__grid-item_departure-day-set');
    }
  }

  #updatePageData() {
    let prevMonth = this.#month;
    let prevYear = this.#year;
    prevMonth -= 1;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear -= 1;
    }

    let nextMonth = this.#month;
    let nextYear = this.#year;
    nextMonth += 1;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }

    let numDaysCurrentMonth = Calendar.#getDaysInMonth(this.#month, this.#year);
    const numDaysPrevMonth = Calendar.#getDaysInMonth(prevMonth, prevYear);

    const date = new Date(this.#year, this.#month, 1);
    let weekDay = date.getDay();
    weekDay -= 1;
    if (weekDay < 0) { weekDay = 6; }

    date.setDate(numDaysCurrentMonth);
    let weekDayLastDay = date.getDay();
    weekDayLastDay -= 1;
    if (weekDayLastDay < 0) { weekDayLastDay = 6; }

    const dates = [];

    while (weekDay > 0) {
      dates.push(new Date(prevYear, prevMonth, numDaysPrevMonth - weekDay));
      weekDay -= 1;
    }

    let buf = numDaysCurrentMonth;
    while (numDaysCurrentMonth > 0) {
      dates.push(new Date(this.#year, this.#month, buf - numDaysCurrentMonth));
      numDaysCurrentMonth -= 1;
    }

    buf = 1;
    while (weekDayLastDay < 6) {
      dates.push(new Date(nextYear, nextMonth, buf));
      buf += 1;
      weekDayLastDay += 1;
    }

    const newPage = dates.map((item) => this.#createDayObject(item));

    this.#pageData = newPage;
  }

  #createDayObject(date) {
    const dayObj = {
      d: date,
      day: date.getDate(),
      isArrivalDeraptureDay: false,
      isCurrentDay: false,
      isCurrentMonth: false,
      isBetweenArrivalDeparture: false,
      isArrivalDay: false,
      isDepartureDay: false,
      isHoverMode: false,
    };

    if (+date === +this.#currentDate) { dayObj.isCurrentDay = true; }

    if (+this.#arrival === +date || +this.#departure === +date) {
      dayObj.isArrivalDeraptureDay = true;
    }

    if (date > this.#arrival && date < this.#departure) {
      dayObj.isBetweenArrivalDeparture = true;
    }

    if (date.getMonth() === this.#month) { dayObj.isCurrentMonth = true; }

    if (this.#departure !== false
      && +date === +this.#arrival
      && +this.#departure !== +this.#arrival) {
      dayObj.isArrivalDay = true;
    }

    if (this.#departure !== false
      && +date === +this.#departure
      && +this.#departure !== +this.#arrival) {
      dayObj.isDepartureDay = true;
    }

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

  static #getMonthString(month) {
    const months = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
    ];
    return months[month];
  }

  static #dateToString(date) {
    if (date instanceof Date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
    return 'ДД.ММ.ГГГГ';
  }

  static #intervalToString(date1, date2) {
    if (date1 instanceof Date && date2 instanceof Date && date1 !== date2) {
      const formattedDate1 = date1
        .toLocaleString('ru', { month: 'long', day: 'numeric' });
      const formattedDate2 = date2
        .toLocaleString('ru', { month: 'long', day: 'numeric' });
      return `${formattedDate1} - ${formattedDate2}`;
    } if (date1 instanceof Date) {
      const formattedDate1 = date1
        .toLocaleString('ru', { month: 'long', day: 'numeric' });
      return `${formattedDate1}`;
    }
    return 'Время проживания';
  }

  static #getDateWithoutHours(date) {
    return (new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  }
}

document.querySelectorAll('.js-calendar').forEach((calendar) => {
  const calendarDOM = calendar;
  calendarDOM.calendar = new Calendar(calendar);
});
