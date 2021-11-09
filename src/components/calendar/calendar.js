function getDaysInMonth(month, year) {
  const date = new Date(year, month, 1);
  let days = 0;
  while (date.getMonth() === month) {
    days += 1;
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function getMonthString(month) {
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  return months[month];
}

function dateToString(date) {
  if (date instanceof Date) { return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`; }
  return 'ДД.ММ.ГГГГ';
}

function intervalToString(date1, date2) {
  if (date1 instanceof Date && date2 instanceof Date && date1 !== date2){
    return `${date1.toLocaleString('ru', {month: 'long', day: 'numeric'})} - ${date2.toLocaleString('ru', {month: 'long', day: 'numeric'})}`;
  } else if (date1 instanceof Date){
    return `${date1.toLocaleString('ru', {month: 'long', day: 'numeric'})}`;
  }
  return 'Время проживания';
}

export default class Calendar {
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
    this._findHtmlElements(calendar);
    this._bindEventHandlersOnHtmlElements();
    this._setCurrentDate();    

    this.#observer = {};
    this.#pageData = {};
    this.#travelData = { arrival: false, departure: false };   

    this._renderPage();
  }

  getNumDays() {
    if (this._arrival instanceof Date && this._departure instanceof Date){
      return ((this._departure.getTime() - this._arrival.getTime()) / (1000 * 3600 * 24) + 1)
    }
    return 0;
  }

  getArrivalDate() {
    return dateToString(this._arrival);
  }
  
  getDepartureDate() {
    return dateToString(this._departure);
  }

  setArrivalDate(date){
    this._arrival = this._getDateWithoutHours(date);
    this._renderPage();
  }

  setDepartureDate(date){
    this._departure = this._getDateWithoutHours(date);
    this._renderPage();
  }

  getIntervalOfArrivalAndDeparture(){
    return intervalToString(this._arrival, this._departure);
  }

  setObserver(observer){
    this.#observer = observer;
  }

  _findHtmlElements(calendar){
    this.#title = calendar.querySelector('.js-calendar__month-title');
    [this.#back, this.#forward] = calendar.getElementsByClassName('js-calendar__month-button');
    [this.#clear, this.#accept] = calendar.querySelector('.js-calendar__buttons-container').children;

    this.#days = [];
    const page = calendar.querySelector('.js-calendar__day-selector');
    for (let i = 7; i < page.children.length; i += 1) { this.#days.push(page.children[i]); }
  }

  _getDateWithoutHours(date){
    return (new Date(date.getFullYear(), date.getMonth(), date.getDate()))
  }

  _setCurrentDate(){
    const currentDate = new Date();
    this.#month = currentDate.getMonth();
    this.#year = currentDate.getFullYear();
    this.#day = currentDate.getDate();
    this.#currentDate = new Date(this.#year, this.#month, this.#day);
  }

  _bindEventHandlersOnHtmlElements(){
    this.#back.onclick = this._backClickHandler.bind(this);
    this.#forward.onclick = this._forwardClickHandler.bind(this);
    this.#clear.onclick = this._clearClickHandler.bind(this);
    this.#accept.onclick = this._acceptClickHandler.bind(this);
    this.#days.forEach((day, idx) => {
      this.#days[idx].onclick = this._dayClickHandler.bind(this, idx);
    });
  }

  get _arrival() {
    return this.#travelData.arrival;
  }

  get _departure() {
    return this.#travelData.departure;
  }

  set _arrival(arrival) {
    this.#travelData.arrival = arrival;
    this.#observer.travelChange?.();
  }

  set _departure(departure) {
    this.#travelData.departure = departure;
    this.#observer.travelChange?.();
  }  

  _dayClickHandler(idx) {    
    const clikedDate = this.#pageData[idx].d;

    if (clikedDate < +this.#currentDate) { return; }

    if (this._arrival === false
          || this._arrival > clikedDate
          || (this._arrival !== false && this._departure !== false)) {
      this._arrival = clikedDate;
      this._departure = false;
    } else {
      this._departure = clikedDate;
    }

    this._renderPage();
  }

  _acceptClickHandler(){
    this.#observer.acceptClick?.();   
  }

  _clearClickHandler() {
    this._arrival = {};
    this._departure = {};

    this.#month = this.#currentDate.getMonth();
    this.#year = this.#currentDate.getFullYear();

    this._renderPage();

    this.#observer.clearClick?.(); 
  }

  _backClickHandler() {
    const date = new Date();
    const mmm = date.getMonth();
    const yyy = date.getFullYear();

    if (this.#month === mmm && this.#year === yyy) { return; }

    this.#month -= 1;
    if (this.#month < 0) {
      this.#month = 11;
      this.#year -= 1;
    }

    this._renderPage();
  }

  _forwardClickHandler() {
    this.#month += 1;
    if (this.#month > 11) {
      this.#month = 0;
      this.#year += 1;
    }

    this._renderPage();
  }

  _renderPage() {
    this._updatePageData();
    const page = this.#pageData;

    for (let idx = 0; idx < this.#days.length; idx += 1) {
      const day = this.#days[idx];    

      if (idx >= page.length) {
        day.classList.add('calendar__grid-item_hidden');
        continue;
      } day.classList.remove('calendar__grid-item_hidden');
      
      if (page[idx].isArrivalDeraptureDay) { day.classList.add('calendar__grid-item_arrival-departure-date'); } else { day.classList.remove('calendar__grid-item_arrival-departure-date'); }

      if (page[idx].isCurrentMonth === false) { day.classList.add('calendar__grid-item_not-current-month-date'); } else { day.classList.remove('calendar__grid-item_not-current-month-date'); }

      if (page[idx].isCurrentDay) { day.classList.add('calendar__grid-item_current-date'); } else { day.classList.remove('calendar__grid-item_current-date'); }

      if (page[idx].isBetweenArrivalDeparture) { day.classList.add('calendar__grid-item_between-arival-departure-date'); } else { day.classList.remove('calendar__grid-item_between-arival-departure-date'); }

      if (page[idx].isArrivalDay) { day.classList.add('calendar__grid-item_arrival-day-set'); } else { day.classList.remove('calendar__grid-item_arrival-day-set'); }

      if (page[idx].isDepartureDay) { day.classList.add('calendar__grid-item_departure-day-set'); } else { day.classList.remove('calendar__grid-item_departure-day-set'); }

      day.textContent = page[idx].day;
    }    
    this.#title.textContent = `${getMonthString(this.#month)} ${this.#year}`;
  }

  _updatePageData() {
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

    let numDaysCurrentMonth = getDaysInMonth(this.#month, this.#year);
    const numDaysPrevMonth = getDaysInMonth(prevMonth, prevYear);

    const date = new Date(this.#year, this.#month, 1);
    let weekDay = date.getDay();
    weekDay -= 1;
    if (weekDay < 0) { weekDay = 6; }

    date.setDate(numDaysCurrentMonth);
    let weekDayLastDay = date.getDay();
    weekDayLastDay -= 1;
    if (weekDayLastDay < 0) { weekDayLastDay = 6; }

    const calendarPage = [];

    while (weekDay > 0) {
      calendarPage.push(new Date(prevYear, prevMonth, numDaysPrevMonth - weekDay));
      weekDay -= 1;
    }

    let buf = numDaysCurrentMonth;
    while (numDaysCurrentMonth > 0) {
      calendarPage.push(new Date(this.#year, this.#month, buf - numDaysCurrentMonth));
      numDaysCurrentMonth -= 1;
    }

    buf = 1;
    while (weekDayLastDay < 6) {
      calendarPage.push(new Date(nextYear, nextMonth, buf));
      buf += 1;
      weekDayLastDay += 1;
    }

    for (let i = 0; i < calendarPage.length; i += 1) {
      calendarPage[i] = this._createDayObject(calendarPage[i]);
    }

    this.#pageData = calendarPage;
  }

  _createDayObject(date) {
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

    if (+this._arrival === +date || +this._departure === +date) {
      dayObj.isArrivalDeraptureDay = true;
    }

    if (date > this._arrival && date < this._departure) { dayObj.isBetweenArrivalDeparture = true; }

    if (date.getMonth() === this.#month) { dayObj.isCurrentMonth = true; }

    if (this._departure !== false && +date === +this._arrival && +this._departure !== +this._arrival) {
      dayObj.isArrivalDay = true;
    }

    if (this._departure !== false
        && +date === +this._departure
        && +this._departure !== +this._arrival) {
      dayObj.isDepartureDay = true;
    }

    return dayObj;
  }
}

let calendars = [];

function calendarsInit() {
  const calendarsDOM = document.getElementsByClassName('js-calendar');

  for (let i = 0; i < calendarsDOM.length; i += 1) {
    const calendar = new Calendar(calendarsDOM[i]);
    calendars.push({ calendar: calendar, DOM: calendarsDOM[i] });

    const arrivalDate = new Date(calendarsDOM[i].getAttribute('data-arrival'));
    const departureDate = new Date(calendarsDOM[i].getAttribute('data-departure'));

    if (arrivalDate instanceof Date)
      calendar.setArrivalDate(arrivalDate);

    if (departureDate instanceof Date)
      calendar.setDepartureDate(departureDate);
  }
}

calendarsInit();

export function getCalendar(calendarDOM) {  
  let calendar = {};

  calendars.forEach((item) => {
    if (item.DOM === calendarDOM) { calendar = item.calendar }
  });  

  return calendar;
}
