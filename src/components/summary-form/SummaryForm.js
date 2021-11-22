class SummaryForm {
  #calendar;

  #calculator;

  #calculatorItems;

  #calculatorPrices;

  #price;

  #priceValue;

  constructor(form) {
    this.#calendar = form.querySelector('.js-calendar');
    this.#price = form.querySelector('.js-summary-form__price');
    this.#calculator = form.querySelector('.js-summary-form__calculator');
    this.#calculatorItems = this.#calculator
      .querySelectorAll('.js-summary-form__calculator-item');
    this.#calculatorPrices = this.#calculator
      .querySelectorAll('.js-summary-form__calculator-price');
    this.#priceValue = parseInt(form.getAttribute('data-price'), 10);

    this.#init();
  }

  #init() {
    this.#calendar
      .addEventListener('click', this.#handleCalendarClick.bind(this));
    this.#updateForm();
  }

  #handleCalendarClick() {
    this.#updateForm();
  }

  #updateForm() {
    const days = this.#calendar.calendar.getNumDays();
    const price = this.#priceValue;

    const itemsValues = days > 0 ? [
      `${SummaryForm.#getFormattedPrice(price)} x ${days} суток`,
      'Сбор за услуги: скидка 2 179₽',
      'Сбор за дополнительные услуги',
      'Итого',
    ] : [
      '0 суток',
      'Сбор за услуги',
      'Сбор за дополнительные услуги',
      'Итого',
    ];
    const pricesValues = days > 0
      ? [price * days, 0, 300, price * days - 2179 + 300]
      : [0, 0, 0, 0];

    this.#updateCalculatorItems(itemsValues);
    this.#updateCalculatorPrices(pricesValues);
    this.#updatePrice(price);
  }

  #updateCalculatorItems(values) {
    values.forEach((value, idx) => {
      this.#calculatorItems[idx].textContent = value;
    });
  }

  #updateCalculatorPrices(values) {
    values.forEach((value, idx) => {
      this.#calculatorPrices[idx].textContent = SummaryForm
        .#getFormattedPrice(value);
    });
  }

  #updatePrice(value) {
    this.#price.textContent = SummaryForm.#getFormattedPrice(value);
  }

  static #getFormattedPrice(price) {
    const str = price.toString();
    return `${str.substr(0, str.length - 3)} ${str.substr(-3)}₽`;
  }
}

export default SummaryForm;
