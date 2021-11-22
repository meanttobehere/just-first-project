import '../calendar/index';
import DateDropdown from './DateDropdown';

document.querySelectorAll('.js-date-dropdown').forEach((dateDropdown) => {
  const dateDropdownDOM = dateDropdown;
  dateDropdownDOM.dateDropdown = new DateDropdown(dateDropdown);
});
