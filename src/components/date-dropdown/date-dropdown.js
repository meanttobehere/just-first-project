document.addEventListener("click", e => {
    
    const isDropdownButton = e.target.closest("[data-dropdown-button]")
    if (isDropdownButton)
        console.log('click')

    if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return
  
    let currentDropdown
    if (isDropdownButton) {
      currentDropdown = e.target.closest("[data-dropdown]")
      currentDropdown.classList.toggle("active")
    }
  
    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
      if (dropdown === currentDropdown) return
      dropdown.classList.remove("active")
    })
})

let back = document.getElementById('back');
let forward = document.getElementById('forward');
let title = document.getElementById('title');
let page = document.getElementById('calendar-page');

let date = new Date();
let month = date.getMonth();
let day = date.getDate();
let year = date.getFullYear();
let weekDay = date.getDay();
let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

document.onload = setPage(month, year);

back.onclick = () => {
  let mmm = date.getMonth();
  let yyy = date.getFullYear();
  if (month === mmm && year === yyy)
    return;
  
  month--;
    if (month < 0) {
      month = 11;
      year--;
    }  
  setPage(month, year);
}

forward.onclick = () => {
  month++;  
  if (month > 11) {
    month = 0;
    year++;
  }
  setPage(month, year);
}

function setArrivalDate(date){
  for (let i = 7; i < page.children.length; i++)
    page.children[i].classList.remove('ff');
  let day = date.getDate();
    
}

function setPage(month, year){
  let page = document.getElementById('calendar-page');
  let title = document.getElementById('title');

  let newPage = getCalendarPage(month, year);
  for (let i = 0; i < newPage.length; i++){
    page.children[i+7].textContent = newPage[i].day
    if (newPage[i].isCurMont === false)
      page.children[i+7].classList.add("qq");
    else
      page.children[i+7].classList.remove("qq");
    page.children[i+7].classList.remove("gg");
  } 

  if ((newPage.length + 7) < page.children.length){
    for (let i = newPage.length+7; i < page.children.length; i++){
      page.children[i].classList.add('hidden');
    }
  }
  else 
    for (let i = 7; i < page.children.length; i++)
      page.children[i].classList.remove('hidden');


  title.textContent = months[month] + " " + year;

  let curDate = new Date();
  let curMonth = date.getMonth();
  let curDay = date.getDate();
  let curYear = date.getFullYear();

  if(curMonth === month && curYear === year)
    page.children[curDay+7].classList.add("gg");
}

function getDaysInMonth(month, year){
  var date = new Date(year, month, 1);
  let days = 0;
  while (date.getMonth() === month) {
    days++;
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function getCalendarPage(month, year) {  
  let prevMonth = month
  let prevYear = year  
  prevMonth--;
  if (prevMonth < 0){
    prevMonth = 11;
    prevYear--;
  }
  let numDaysCurrentMonth = getDaysInMonth(month, year)
  let numDaysPrevMonth = getDaysInMonth(prevMonth, prevYear)

  let date = new Date(year, month, 1);
  let weekDay = date.getDay();
  weekDay--;
    if (weekDay < 0)
      weekDay = 6;

  date.setDate(numDaysCurrentMonth)
  let weekDayLastDay = date.getDay();
  weekDayLastDay--;
    if (weekDayLastDay < 0)
      weekDayLastDay = 6;

  let calendarPage = [];

  while (weekDay-- > 0){
    calendarPage.push({
      day: (numDaysPrevMonth - weekDay),
      isCurMont: false,
    });
  }
    
  let buf = numDaysCurrentMonth
  while (numDaysCurrentMonth-- > 0)
    calendarPage.push({
      day: (buf - numDaysCurrentMonth),
      isCurMont: true,
    });
    
  buf = 1;
  while (weekDayLastDay++ < 6)
    calendarPage.push({
      day: buf++,
      isCurMont: false,
    })

  return calendarPage;
}
