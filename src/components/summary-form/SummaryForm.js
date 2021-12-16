class SummaryForm {
  #calendar;

  #calculatorItems;

  #calculatorPrices;

  #numberPrice;

  #services;

  constructor(form) {
    this.#calendar = form.querySelector('.js-calendar');
    this.#calculatorItems = form
      .querySelectorAll('.js-summary-form__calculator-item');
    this.#calculatorPrices = form
      .querySelectorAll('.js-summary-form__calculator-price');
    this.#numberPrice = parseInt(form.getAttribute('data-price'), 10);
    this.#services = JSON.parse(form.getAttribute('data-services'));

    this.#init();
  }

  #init() {
    this.#calendar
      .addEventListener('click', this.#handleCalendarClick.bind(this));
    this.#update();
  }

  #handleCalendarClick() {
    this.#update();
  }

  #update() {
    const days = this.#calendar.calendar.getNumDays();

    const firstItem = {
      name: `${SummaryForm.#getFormattedPrice(this.#numberPrice)} x ${days} суток`,
      cost: this.#numberPrice * days,
    };

    const serviceItems = this.#services.map((item) => {
      if (item.cost < 0) {
        return ({
          ...item,
          name: `${item.name}: скидка ${SummaryForm.#getFormattedPrice(-item.cost)}`,
        });
      }
      return { ...item };
    });

    const totalCost = [firstItem, ...serviceItems]
      .map((item) => item.cost)
      .reduce((acc, cost) => acc + cost);

    [
      firstItem,
      ...serviceItems,
      { name: 'Итого', cost: totalCost },
    ].forEach((item, idx) => {
      this.#calculatorItems[idx].textContent = item.name;
      this.#calculatorPrices[idx].textContent = SummaryForm
        .#getFormattedPrice(item.cost);
    });
  }

  static #getFormattedPrice(price) {
    const newPrice = price < 0 ? 0 : price;
    return `${newPrice.toLocaleString('ru-RU')}₽`;
  }
}

export default SummaryForm;
