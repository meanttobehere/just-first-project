import { getCalendar } from '../calendar/calendar';

export function getFormattedPrice(price) {
  const str = price.toString();
  return `${str.substr(0, str.length - 3)} ${str.substr(-3)}₽`;
}

function updateCalculator(calculator) {
  const days = parseInt(calculator.getAttribute('data-days'), 10);
  const price = parseInt(calculator.getAttribute('data-price'), 10);

  const [...items] = calculator.getElementsByClassName('calculator__item');
  const [...prices] = calculator.getElementsByClassName('calculator__price');

  if (days > 0) {
    items[0].textContent = `${getFormattedPrice(price)} x ${days} суток`;
    items[1].textContent = 'Сбор за услуги: скидка 2 179₽';
    items[2].textContent = 'Сбор за дополнительные услуги';
    items[3].textContent = 'Итого';

    prices[0].textContent = getFormattedPrice(price * days);
    prices[1].textContent = getFormattedPrice(0);
    prices[2].textContent = getFormattedPrice(300);
    prices[3].textContent = getFormattedPrice(price * days - 2179 + 300);
  } else {
    items[0].textContent = '0 суток';
    items[1].textContent = '';
    items[2].textContent = '';
    items[3].textContent = 'Итого';

    prices[0].textContent = getFormattedPrice(0);
    prices[1].textContent = getFormattedPrice(0);
    prices[2].textContent = getFormattedPrice(0);
    prices[3].textContent = getFormattedPrice(0);
  }
}

function summaryFormsInit() {
  const forms = document.getElementsByClassName('js-summary-form');

  for (let i = 0; i < forms.length; i += 1) {
    const calendarDOM = forms[i].querySelector('.js-calendar');
    const calendar = getCalendar(calendarDOM);
    const calculator = forms[i].querySelector('.js-calculator');

    calendarDOM.addEventListener('click', () => {
      calculator.setAttribute('data-days', calendar.getNumDays());
      updateCalculator(calculator);
    });

    updateCalculator(calculator);
  }
}

summaryFormsInit();
