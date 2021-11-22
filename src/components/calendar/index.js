import Calendar from './Calendar';

document.querySelectorAll('.js-calendar').forEach((calendar) => {
  const calendarDOM = calendar;
  calendarDOM.calendar = new Calendar(calendar);
});
