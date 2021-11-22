import CheckboxList from './CheckboxList';

document
  .querySelectorAll('.js-checkbox-list.checkbox-list_expandable')
  .forEach((list) => {
    const listDOM = list;
    listDOM.checkboxList = new CheckboxList(list);
  });
