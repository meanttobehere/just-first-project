import { dropdownItemReset, dropdownItemGetCounter } from './__item/dropdown__item';

function getClearButtonStyle(button, items) {
  const { classList } = button;
  let sum = 0;
  for (let j = 0; j < items.length; j += 1) { sum += dropdownItemGetCounter(items[j]); }
  if (sum === 0) { classList.add('button_hide'); } else { classList.remove('button_hide'); }
  return classList;
}

function dropdownsInit() {

  document.addEventListener('click', (event) => {
    const dropdownField = event.target.closest('.js-dropdown__field');
    const currentDropdown = event.target.closest('.js-dropdown');

    if (!dropdownField && currentDropdown) { return; }

    if (dropdownField) { currentDropdown.classList.toggle('dropdown_active'); }

    document.querySelectorAll('.js-dropdown.dropdown_active').forEach((dropdown) => {
      if (dropdown === currentDropdown) { return; }
      dropdown.classList.remove('dropdown_active');
    });
  });

  const dropdowns = document.getElementsByClassName('js-dropdown');

  for (let i = 0; i < dropdowns.length; i += 1) {
    const dropdown = dropdowns[i];
    const dropdownButtonsContainer = dropdown.querySelector('.js-dropdown__buttons-container');    

    if (dropdownButtonsContainer) {
      const [clearBtn, acceptBtn] = dropdownButtonsContainer.children;
      const items = dropdown.getElementsByClassName('js-dropdown-item');
      const menu = dropdown.querySelector('.js-dropdown__menu');

      clearBtn.addEventListener('click', () => {
        dropdown.classList.remove('dropdown_active');
        for (let j = 0; j < items.length; j += 1) { dropdownItemReset(items[j]); }
      });

      acceptBtn.addEventListener('click', () => {
        dropdown.classList.remove('dropdown_active');
      });

      menu.addEventListener('click', () => {
        clearBtn.classList = getClearButtonStyle(clearBtn, items);
      });

      clearBtn.classList = getClearButtonStyle(clearBtn, items);
    }
  }
}

dropdownsInit();
