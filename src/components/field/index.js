import Field from './Field';

document.querySelectorAll('.js-field.field_masked').forEach((field) => {
  const fieldDOM = field;
  fieldDOM.field = new Field(field);
});
