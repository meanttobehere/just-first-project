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


class Calendar{
    constructor(dateDropdown)
    {
        this.currentDate = new Date();
        this.month = this.currentDate.getMonth();        
        this.year = this.currentDate.getFullYear();
        this.day = this.currentDate.getDate();
        this.currentDate = new Date(this.year, this.month, this.day);     
        
        this.title = dateDropdown.getElementsByClassName('date-dropdown__month-title')[0];
        this.back = dateDropdown.getElementsByClassName('date-dropdown__img-container2')[0];
        this.forward = dateDropdown.getElementsByClassName('date-dropdown__img-container2')[1];
        this.arrival = dateDropdown.getElementsByClassName('date-dropdown__text')[0];
        this.departure = dateDropdown.getElementsByClassName('date-dropdown__text')[1];        
        
        this.days = [];
        let page = dateDropdown.getElementsByClassName('date-dropdown__day-selector')[0];
        for (let i = 7; i < page.children.length; i++)
            this.days.push(page.children[i]); 

        this.back.onclick = this.setPreviousPage.bind(this);
        this.forward.onclick = this.setNextPage.bind(this);
        this.days.forEach((day, idx) => day.onclick = this.dayClickHandler.bind(this, idx));

        this.travel = {arrival: false, departure: false};
        this.pageData = {};

        this.renderPage();
    }

    dayClickHandler(idx){        
        let clikedDate = this.pageData[idx].d;
        
        if (clikedDate < +this.currentDate)
            return;

        if (this.travel.arrival === false 
          || this.travel.arrival > clikedDate
          || this.travel.arrival !== false && this.travel.departure !== false)
        {
            this.travel.arrival = clikedDate;            
            this.travel.departure = false;
        } else 
        {
            this.travel.departure = clikedDate;
        }

        this.renderPage(); 
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
                day.classList.add('hidden');
                return;
            } else
                day.classList.remove('hidden');

            if (page[idx].isArrivalDeraptureDay)
                day.classList.add('ff')
            else
                day.classList.remove('ff')

            if (page[idx].isCurrentMonth === false)
                day.classList.add("qq");
            else
                day.classList.remove("qq");
                
            if (page[idx].isCurrentDay)
                day.classList.add("gg");
            else
                day.classList.remove("gg");

            if (page[idx].isBetweenArrivalDeparture)
                day.classList.add("oo");
            else
                day.classList.remove("oo");
            
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
        };        
      
        if (+date === +this.currentDate)
            dayObj.isCurrentDay = true;        

        if (+this.travel.arrival === +date || +this.travel.departure === +date)
            dayObj.isArrivalDeraptureDay = true;        

        if (date > this.travel.arrival && date < this.travel.departure)
            dayObj.isBetweenArrivalDeparture = true;

        if (date.getMonth() === this.month)
            dayObj.isCurrentMonth = true;
        
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
}

function dateDropdownsInit()
{
    dateDropdowns = document.getElementsByClassName('date-dropdown');    
    
    let calendars = [];

    for (let i = 0; i < dateDropdowns.length; i++)
    { 
        let calendar = new Calendar(dateDropdowns[i]);
        calendars.push[calendar];
    }    
}

dateDropdownsInit();