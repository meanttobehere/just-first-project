import arrow_back from './arrow-back.svg'
import arrow_forward from './arrow-forward.svg'

class Calendar
{
    constructor(calendar)
    {
        this.currentDate = new Date();
        this.month = this.currentDate.getMonth();        
        this.year = this.currentDate.getFullYear();
        this.day = this.currentDate.getDate();
        this.currentDate = new Date(this.year, this.month, this.day);
        
        this.title = calendar.querySelector('.calendar__month-title');
        this.back = calendar.getElementsByClassName('calendar__arrow-button')[0];
        this.forward = calendar.getElementsByClassName('calendar__arrow-button')[1];
        this.clear = calendar.getElementsByClassName('button')[0];       
        this.accept = calendar.getElementsByClassName('button')[1];       
        
        this.days = [];
        let page = calendar.querySelector('.calendar__day-selector');
        for (let i = 7; i < page.children.length; i++)
            this.days.push(page.children[i]);

        this.back.onclick = this.setPreviousPage.bind(this);
        this.forward.onclick = this.setNextPage.bind(this);
        this.clear.onclick = this.clearPage.bind(this);
        this.accept.onclick = this.acceptClick.bind(this);
        this.days.forEach((day, idx) => day.onclick = this.dayClickHandler.bind(this, idx));        

        this.pageData = {};
        this.travelData = {arrival: false, departure: false};        
        this.changeTravelEvent = () => {};

        this.clearButtonClick = () => {};
        this.acceptButtonClick = () => {};

        this.renderPage();
    }

    get arrival(){
        return this.travelData.arrival;         
    }

    get departure(){
        return this.travelData.departure;         
    }

    set arrival(arrival){
        this.travelData.arrival = arrival;  
        this.changeTravelEvent();
    }

    set departure(departure){
        this.travelData.departure = departure; 
        this.changeTravelEvent();
    }

    dayClickHandler(idx){        
        let clikedDate = this.pageData[idx].d;
        
        if (clikedDate < +this.currentDate)
            return;

        if (this.arrival === false 
          || this.arrival > clikedDate
          || this.arrival !== false && this.departure !== false)
        {
            this.arrival = clikedDate;            
            this.departure = false;
        } else 
        {
            this.departure = clikedDate;
        }

        this.renderPage(); 
    }

    acceptClick(){
        this.acceptButtonClick();
    }

    clearPage(){
        this.arrival = {};
        this.departure = {};

        this.month = this.currentDate.getMonth();
        this.year = this.currentDate.getFullYear();

        this.renderPage();

        this.clearButtonClick();
    }

    setPreviousPage()
    {
        let date = new Date();
        let mmm = date.getMonth();
        let yyy = date.getFullYear();

        if (this.month === mmm && this.year === yyy)
            return;
        
        this.month--;
            if (this.month < 0) {
                this.month = 11;
                this.year--;
            }

        this.renderPage();        
    }
    
    setNextPage()
    {
        this.month++; 
        if (this.month > 11){
          this.month = 0;
          this.year++;
        }

        this.renderPage();
    }

    renderPage()
    {
        this.updatePageData();
        let page = this.pageData;      
        
        this.days.forEach((day, idx) => 
        {
            if (idx >= page.length){
                day.classList.add("calendar__grid-item_hidden");
                return;
            } else
                day.classList.remove("calendar__grid-item_hidden");

            if (page[idx].isArrivalDeraptureDay)
                day.classList.add("calendar__grid-item_arrival-departure-date")
            else
                day.classList.remove("calendar__grid-item_arrival-departure-date")

            if (page[idx].isCurrentMonth === false)
                day.classList.add("calendar__grid-item_not-current-month-date");
            else
                day.classList.remove("calendar__grid-item_not-current-month-date");
                
            if (page[idx].isCurrentDay)
                day.classList.add("calendar__grid-item_current-date");
            else
                day.classList.remove("calendar__grid-item_current-date");

            if (page[idx].isBetweenArrivalDeparture)
                day.classList.add("calendar__grid-item_between-arival-departure-date");
            else
                day.classList.remove("calendar__grid-item_between-arival-departure-date");

            if (page[idx].isArrivalDay)
                day.classList.add("calendar__grid-item_arrival-day-set")
            else
                day.classList.remove("calendar__grid-item_arrival-day-set");

            if (page[idx].isDepartureDay)
                day.classList.add("calendar__grid-item_departure-day-set")
            else
                day.classList.remove("calendar__grid-item_departure-day-set");
            
            day.textContent = page[idx].day;                       
        })    
          
        this.title.textContent = this.getMonthString(this.month) + " " + this.year;    
    }  

    getMonthString(month){
      let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      return months[month];
    }

    updatePageData()
    {
        let prevMonth = this.month;
        let prevYear = this.year; 
        prevMonth--;
        if (prevMonth < 0){
            prevMonth = 11;
            prevYear--;
        }

        let nextMonth = this.month;
        let nextYear = this.year;
        nextMonth++;
        if (nextMonth > 11){
            nextMonth = 0;
            nextYear++;
        }

        let numDaysCurrentMonth = this.getDaysInMonth(this.month, this.year);
        let numDaysPrevMonth = this.getDaysInMonth(prevMonth, prevYear);

        let date = new Date(this.year, this.month, 1);
        let weekDay = date.getDay();
        weekDay--;
        if (weekDay < 0)
            weekDay = 6;

        date.setDate(numDaysCurrentMonth);
        let weekDayLastDay = date.getDay();
        weekDayLastDay--;
            if (weekDayLastDay < 0)
                weekDayLastDay = 6;

        let calendarPage = [];        

        while (weekDay-- > 0)
            calendarPage.push(new Date(prevYear, prevMonth, numDaysPrevMonth - weekDay));
                  
        let buf = numDaysCurrentMonth
        while (numDaysCurrentMonth-- > 0)                  
            calendarPage.push(new Date(this.year, this.month, buf - numDaysCurrentMonth));           
                  
        buf = 1;
        while (weekDayLastDay++ < 6)        
            calendarPage.push(new Date(nextYear, nextMonth, buf++));                    

        for (let i = 0; i < calendarPage.length; i++)
            calendarPage[i] = this.createDayObject(calendarPage[i]);

        this.pageData = calendarPage;
    }

    createDayObject(date)
    {
        let dayObj = {
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
      
        if (+date === +this.currentDate)
            dayObj.isCurrentDay = true;        

        if (+this.arrival === +date || +this.departure === +date)
            dayObj.isArrivalDeraptureDay = true;        

        if (date > this.arrival && date < this.departure)
            dayObj.isBetweenArrivalDeparture = true;

        if (date.getMonth() === this.month)
            dayObj.isCurrentMonth = true;

        if (this.departure !== false && +date === +this.arrival && +this.departure !== +this.arrival)
            dayObj.isArrivalDay = true;

        if (this.departure !== false && +date === +this.departure && +this.departure !== +this.arrival)
            dayObj.isDepartureDay = true;        
        
        return dayObj;
    }

    getDaysInMonth(month, year){
        var date = new Date(year, month, 1);
        let days = 0;
        while (date.getMonth() === month) {
            days++;
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    dateToString(date){  
      if (date instanceof Date)
          return date.getDate().toString().padStart(2, '0') + "." + (date.getMonth() + 1).toString().padStart(2, '0') + "." + date.getFullYear();
      else
          return "ДД.ММ.ГГГГ"
    }
}

let calendars = [];

function calendarsInit()
{
    let calendarsDOM = document.getElementsByClassName('calendar');        

    for (let i = 0; i < calendarsDOM.length; i++)
    { 
        let calendar = new Calendar(calendarsDOM[i]);
        calendars.push({calendar: calendar, DOM: calendarsDOM[i]});
    }  
}

export function getCalendar(calendarDOM){
    let calendar = {};
    
    calendars.forEach(item => {
        if (item.DOM === calendarDOM)
            calendar = item.calendar;
    })

    return calendar;
}

export function getArrivalDate(calendar){
    return calendar.dateToString(calendar.arrival);
}

export function getDepartureDate(calendar){
    return calendar.dateToString(calendar.departure);
}

calendarsInit();