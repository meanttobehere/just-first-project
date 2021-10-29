import '../dropdown/dropdown';
import { dropdownItemGetCounter } from '../dropdown/__item/dropdown__item';

function generateText(bedrooms, beds) {
  let text = '';

  if (bedrooms % 10 === 1 && bedrooms !== 11) { text = `${bedrooms} спальня`; } else if (bedrooms % 10 >= 2 && bedrooms % 10 <= 4) { text = `${bedrooms} спальни`; } else { text = `${bedrooms} спален`; }

  if (beds === 0) { return text; }

  if (beds % 10 === 1 && beds !== 11) { text += `, ${beds} кровать...`; } else if (beds % 10 >= 2 && beds % 10 <= 4) { text += `, ${beds} кровати...`; } else { text += `, ${beds} кроватей...`; }

  return text;
}

function roomDropdownsInit() {
  const dropdowns = document.getElementsByClassName('js-room-dropdown');

  for (let i = 0; i < dropdowns.length; i += 1) {
    const field = dropdowns[i].querySelector('.js-dropdown__field').childNodes[0];
    const [bedrooms, beds] = dropdowns[i].getElementsByClassName('js-dropdown-item');
    const menu = dropdowns[i].querySelector('.js-dropdown__menu');

    const setText = function setText() {
      const bedroomsCount = dropdownItemGetCounter(bedrooms);
      const bedsCount = dropdownItemGetCounter(beds);
      field.textContent = generateText(bedroomsCount, bedsCount);
    };

    menu.addEventListener('click', () => {
      setText();
    });

    setText();
  }
}

roomDropdownsInit();
