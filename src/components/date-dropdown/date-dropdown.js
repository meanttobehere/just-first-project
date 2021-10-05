import arrow_down from './arrow-down.svg'
import {getCalendar, getArrivalDate, getDepartureDate} from '../calendar/calendar.js'

function dateDropdownsInit()
{    
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

    let dropdowns = document.getElementsByClassName('date-dropdown');     
    
    for (let i = 0; i < dropdowns.length; i++)
    {
        let dropdown = dropdowns[i];

        let calendarDOM = dropdown.querySelector('.calendar');
        let calendar = getCalendar(calendarDOM);

        let arrival = dropdown.getElementsByClassName('date-dropdown__text')[0];
        let departure = dropdown.getElementsByClassName('date-dropdown__text')[1];

        calendar.changeTravelEvent = () => {  
            arrival.textContent = getArrivalDate(calendar);
            departure.textContent = getDepartureDate(calendar);  
        }

        calendar.acceptButtonClick = () => {
            dropdown.classList.remove("active");
        }

        calendar.clearButtonClick = () => {
            dropdown.classList.remove("active");
        }     
    }
}

dateDropdownsInit();