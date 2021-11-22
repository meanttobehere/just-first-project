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

export default Field;
