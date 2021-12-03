/* eslint-disable-next-line import/no-extraneous-dependencies */
import Inputmask from 'inputmask';

class Field {
  constructor(field) {
    const input = field.querySelector('.js-field__input');
    Inputmask({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      placeholder: 'ДД.ММ.ГГГГ',
    }).mask(input);
  }
}

export default Field;
