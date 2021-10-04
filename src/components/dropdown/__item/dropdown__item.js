function dropdownItemsInit()
{
    let items = document.getElementsByClassName('dropdown__item');      

    for (let i = 0; i < items.length; i++)
    { 
        let buttons = items[i].getElementsByClassName('dropdown__item-button');
        let counter = items[i].querySelector('.dropdown__item-counter');

        dropdownItemSetStyle(buttons[0], counter);
        
        buttons[0].addEventListener("click", () => {
            counterDown(counter);
            dropdownItemSetStyle(buttons[0], counter);
        });

        buttons[1].addEventListener("click", () => {
            counterUp(counter);
            dropdownItemSetStyle(buttons[0], counter);
        })
    }
}

function counterDown(counter){
    let currentValue = Number.parseInt(counter.textContent);
    if (currentValue === 0)
        return;           
    currentValue--; 
    counter.textContent = currentValue;
}

function counterUp(counter){
    let currentValue = Number.parseInt(counter.textContent);            
    currentValue++;
    counter.textContent = currentValue;
}

function dropdownItemSetStyle(button, counter){
    if (counter.textContent === '0')
        button.classList.add('dropdown__item-button_disable');
    else
        button.classList.remove('dropdown__item-button_disable');
}

export function dropdownItemReset(item){
    let buttons = item.getElementsByClassName('dropdown__item-button');
    let counter = item.querySelector('.dropdown__item-counter');
    counter.textContent = '0';
    dropdownItemSetStyle(buttons[0], counter);
}

export function dropdownItemGetCounter(item){
    let counter = item.querySelector('.dropdown__item-counter');
    return Number.parseInt(counter.textContent);
}

dropdownItemsInit();