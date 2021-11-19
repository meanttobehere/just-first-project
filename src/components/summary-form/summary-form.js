class SummaryForm{
  #calendar;
  #calculator;
  #calculatorItems;
  #calculatorPrices;
  #price;
  #priceValue;

  constructor(form){
    this.#calendar = form.querySelector('.js-calendar');
    this.#price = form.querySelector('.js-summary-form__price');
    this.#calculator = form.querySelector('.js-summary-form__calculator');
    this.#calculatorItems
      = this.#calculator.querySelectorAll('.calculator__item');
    this.#calculatorPrices
      = this.#calculator.querySelectorAll('.calculator__price');
    this.#priceValue = parseInt(form.getAttribute('data-price'), 10);

    this.#calendar
      .addEventListener('click', this._handleCalendarClick.bind(this));
    this._updateForm();
  }

  _handleCalendarClick(){
    this._updateForm();
  }

  _updateForm(){
    const days = this.#calendar._calendar.getNumDays();
    const price = this.#priceValue;

    const itemsValue = days > 0 ? [
      `${this._getFormattedPrice(price)} x ${days} суток`,
      'Сбор за услуги: скидка 2 179₽',
      'Сбор за дополнительные услуги',
      'Итого'
    ] : [
      '0 суток',
      'Сбор за услуги',
      'Сбор за дополнительные услуги',
      'Итого'
    ];
    const pricesValue = days > 0 ? [
      this._getFormattedPrice(price * days),
      this._getFormattedPrice(0),
      this._getFormattedPrice(300),
      this._getFormattedPrice(price * days - 2179 + 300)
    ] : [
      this._getFormattedPrice(0),
      this._getFormattedPrice(0),
      this._getFormattedPrice(0),
      this._getFormattedPrice(0)
    ]

    this.#calculatorItems.forEach((item, idx) => {
      item.textContent = itemsValue[idx]
    });
    this.#calculatorPrices.forEach((price, idx) => {
      price.textContent = pricesValue[idx]
    });
    this.#price.textContent = this._getFormattedPrice(this.#priceValue);
  }

  _getFormattedPrice(price) {
    const str = price.toString();
    return `${str.substr(0, str.length - 3)} ${str.substr(-3)}₽`;
  }
}

document.querySelectorAll('.js-summary-form').forEach(form => {
  form._summaryForm = new SummaryForm(form);
});