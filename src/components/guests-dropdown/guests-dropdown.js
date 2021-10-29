import '../dropdown/dropdown';
import { dropdownItemGetCounter } from '../dropdown/__item/dropdown__item';

function generateText(adults, children, babies) {
  let text = '';

  const guests = adults + children + babies;

  if (guests === 0) { return ('Сколько гостей'); }

  if (guests % 10 === 1 && guests !== 11) { text = `${guests} гость`; } else if (guests % 10 >= 2 && guests % 10 <= 4) { text = `${guests} гостя`; } else { text = `${guests} гостей`; }

  if (babies === 0) { return text; }

  if (babies % 10 === 1 && babies !== 11) { text += `, ${babies} младенец`; } else if (babies % 10 >= 2 && babies % 10 <= 4) { text += `, ${babies} младенца`; } else { text += `, ${babies} младенцев`; }

  return text;
}

function guestsDropdownsInit() {
  const dropdowns = document.getElementsByClassName('js-guests-dropdown');

  for (let i = 0; i < dropdowns.length; i += 1) {
    const dropdown = dropdowns[i];

    const field = dropdown.querySelector('.js-dropdown__field').childNodes[0];
    const [adults, children, babies] = dropdown.getElementsByClassName('js-dropdown-item');
    const menu = dropdown.querySelector('.js-dropdown__menu');

    const setText = function setText() {
      const adultsCount = dropdownItemGetCounter(adults);
      const childrenCount = dropdownItemGetCounter(children);
      const babiesCount = dropdownItemGetCounter(babies);
      field.textContent = generateText(adultsCount, childrenCount, babiesCount);
    };

    menu.addEventListener('click', () => {
      setText();
    });

    setText();
  }
}

guestsDropdownsInit();
