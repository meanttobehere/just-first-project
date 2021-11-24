import '../dropdown-item/index';
import Dropdown from './Dropdown';

document.querySelectorAll('.js-dropdown').forEach((dropdown) => {
  const dropdownDOM = dropdown;
  dropdownDOM.dropdown = new Dropdown(dropdown);
});
