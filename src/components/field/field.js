/* eslint import/no-extraneous-dependencies:
["error", {"devDependencies": true}] */
import Inputmask from 'inputmask';

class Field {
  constructor(field) {
    const input = field.querySelector('.js-field__input');
    Inputmask({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      jitMasking: true,
    }).mask(input);
  }
}

document.querySelectorAll('.js-field.field_masked').forEach((field) => {
  const fieldDOM = field;
  fieldDOM.field = new Field(field);
});
