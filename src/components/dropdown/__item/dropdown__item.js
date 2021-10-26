function getCounterDownValue(counter) {
  let currentValue = Number.parseInt(counter.textContent, 10);
  if (currentValue === 0) { return 0; }
  currentValue -= 1;
  return currentValue;
}

function getCounterUpValue(counter) {
  let currentValue = Number.parseInt(counter.textContent, 10);
  currentValue += 1;
  return currentValue;
}

function getMinusButtonStyle(button, counter) {
  const { classList } = button;
  if (counter.textContent === '0') {
    classList.add('dropdown-item__button_disable');
  } else {
    classList.remove('dropdown-item__button_disable');
  }
  return classList;
}

function dropdownItemsInit() {
  const items = document.getElementsByClassName('js-dropdown-item');

  for (let i = 0; i < items.length; i += 1) {
    const [minusButton, plusButton] = items[i].getElementsByClassName('js-dropdown-item__button');
    const counter = items[i].querySelector('.js-dropdown-item__counter');

    minusButton.classList = getMinusButtonStyle(minusButton, counter);

    minusButton.addEventListener('click', () => {
      counter.textContent = getCounterDownValue(counter);
      minusButton.classList = getMinusButtonStyle(minusButton, counter);
    });

    plusButton.addEventListener('click', () => {
      counter.textContent = getCounterUpValue(counter);
      minusButton.classList = getMinusButtonStyle(minusButton, counter);
    });
  }
}

dropdownItemsInit();

export function dropdownItemReset(item) {
  const [minusButton] = item.getElementsByClassName('js-dropdown-item__button');
  const counter = item.querySelector('.js-dropdown-item__counter');
  counter.textContent = '0';
  minusButton.classList = getMinusButtonStyle(minusButton, counter);
}

export function dropdownItemGetCounter(item) {
  const counter = item.querySelector('.js-dropdown-item__counter');
  return Number.parseInt(counter.textContent, 10);
}
