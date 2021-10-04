import dropdownArrow from './dropdown__arrow.svg'
import {dropdownItemReset, dropdownItemGetCounter} from './__item/dropdown__item.js'

function dropdownsInit()
{
    document.addEventListener("click", event => {
        
        let dropdownButton = event.target.closest(".dropdown__field");
        let currentDropdown = event.target.closest(".dropdown");

        if (!dropdownButton && currentDropdown) 
            return;

        if (dropdownButton)
            currentDropdown.classList.toggle("dropdown_active");        
    
        document.querySelectorAll(".dropdown_active").forEach(dropdown => {
            if (dropdown === currentDropdown) 
                return;
            dropdown.classList.remove("dropdown_active");
        });
    })

    let dropdowns = document.getElementsByClassName('dropdown');

    for (let i = 0; i < dropdowns.length; i++)
    {
        let buttons = dropdowns[i].getElementsByClassName("button");
        
        if (buttons.length === 0)
            continue;
        
        let items = dropdowns[i].getElementsByClassName("dropdown__item");
        let menu = dropdowns[i].querySelector('.dropdown__menu');       

        buttons[1].addEventListener("click", () => {
            dropdowns[i].classList.remove("dropdown_active");
        });

        buttons[0].addEventListener("click", () => {            
            dropdowns[i].classList.remove("dropdown_active");            
            for (let j = 0; j < items.length; j++)
                dropdownItemReset(items[j]);
        });

        menu.addEventListener("click", () => {
            dropdownSetStyle(items, buttons[0]); 
        });

        dropdownSetStyle(items, buttons[0]); 
    }
}

function dropdownSetStyle(items, button){
    let sum = 0;
    for (let j = 0; j < items.length; j++)
        sum += dropdownItemGetCounter(items[j]);
    if (sum === 0)
        button.classList.add('button_hide');            
    else
        button.classList.remove('button_hide');
}

dropdownsInit();