import '../dropdown/dropdown.js'

function guestsDropdownsInit()
{
    let dropdowns = document.getElementsByClassName('guests-dropdown');
    
    function generateText(adults, children, babies)
    {
        let text = '';

        let guests = adults + children + babies;

        if (guests === 0)
            return ("Сколько гостей");

        if (guests % 10 === 1 && guests !== 11)
            text = guests + ' гость';
        else if (guests % 10 >= 2 && guests % 10 <= 4)
            text = guests + ' гостя';
        else
            text = guests + ' гостей';

        if (babies === 0)
            return text;

        if (babies % 10 === 1 && babies !== 11)
            text += ', ' + babies + ' младенец';
        else if (babies % 10 >= 2 && babies % 10 <= 4)
            text += ', ' + babies + ' младенца';
        else
            text += ', ' + babies + ' младенцев';

        return text;
    }    
    
    for (let i = 0; i < dropdowns.length; i++)
    {        
        let text = dropdowns[i].querySelector(".dropdown__text");
        let items = dropdowns[i].getElementsByClassName("dropdown__item-counter");
        let menu = dropdowns[i].querySelector(".dropdown__menu");

        function setText(){
            let adults = Number.parseInt(items[0].textContent);
            let children = Number.parseInt(items[1].textContent);
            let babies = Number.parseInt(items[2].textContent);
            text.textContent = generateText(adults, children, babies);
        }

        menu.addEventListener("click", () => {
            setText();
        });

        setText();
    }
}

guestsDropdownsInit();