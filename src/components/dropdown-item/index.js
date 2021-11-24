import DropdownItem from './DropdownItem';

document.querySelectorAll('.js-dropdown-item').forEach((dropdownItem) => {
  const dropdownItemDOM = dropdownItem;
  dropdownItemDOM.dropdownItem = new DropdownItem(dropdownItem);
});
