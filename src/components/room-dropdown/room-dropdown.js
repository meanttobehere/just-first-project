import '../dropdown/dropdown.js'

function roomDropdownsInit()
{
    let dropdowns = document.getElementsByClassName('room-dropdown');
    
    function generateText(bedrooms, beds, bathrooms)
    {
        let text = '';

        if (bedrooms % 10 === 1 && bedrooms !== 11)
            text = bedrooms + ' спальня';
        else if (bedrooms % 10 >= 2 && bedrooms % 10 <= 4)
            text = bedrooms + ' спальни';
        else
            text = bedrooms + ' спален';

        if (beds === 0)
            return text;

        if (beds % 10 === 1 && beds !== 11)
            text += ', ' + beds + ' кровать...';
        else if (beds % 10 >= 2 && beds % 10 <= 4)
            text += ', ' + beds + ' кровати...';
        else
            text += ', ' + beds + ' кроватей...';

        return text;
    }    
    
    for (let i = 0; i < dropdowns.length; i++)
    {        
        let text = dropdowns[i].querySelector(".dropdown__text");
        let items = dropdowns[i].getElementsByClassName("dropdown__item-counter");
        let menu = dropdowns[i].querySelector(".dropdown__menu");

        function setText(){
            let bedrooms = Number.parseInt(items[0].textContent);
            let beds = Number.parseInt(items[1].textContent);
            let bathrooms = Number.parseInt(items[2].textContent);
            text.textContent = generateText(bedrooms, beds, bathrooms);
        }

        menu.addEventListener("click", () => {
            setText();
        });

        setText();
    }
}

roomDropdownsInit();