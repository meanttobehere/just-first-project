import '../dropdown/index';
import GuestsDropdown from './GuestsDropdown';

document.querySelectorAll('.js-guests-dropdown').forEach((guestsDropdown) => {
  const guestsDropdownDOM = guestsDropdown;
  guestsDropdownDOM.guestsDropdown = new GuestsDropdown(guestsDropdown);
});
