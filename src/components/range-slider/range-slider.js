import { getFormattedPrice } from '../summary-form/summary-form';
import './lib/slider';

function getPriceAttr(val1, val2) {
  return `${getFormattedPrice(val1)} - ${getFormattedPrice(val2)}`;
}

function rangeSlidersInit() {
  const $rangeSliders = $('.js-range-slider');

  $rangeSliders.each((index, rangeSlider) => {
    const $slider = $(rangeSlider).find('.js-range-slider__slider');
    const $price = $('.js-range-slider__price');

    const val1 = parseInt($slider.attr('data-val1'), 10);
    const val2 = parseInt($slider.attr('data-val2'), 10);
    const step = parseInt($slider.attr('data-step'), 10);
    const min = parseInt($slider.attr('data-min'), 10);
    const max = parseInt($slider.attr('data-max'), 10);

    $slider.superSlider({
      displayTips: false,
      pointerPosition: val1,
      secondPointerPosition: val2,
      minValue: min,
      maxValue: max,
      step,
    });
    $slider.superSlider('pointerPosition', val1);
    $price.attr('data-value', getPriceAttr(val1, val2));
    $slider.on('sliderupdate', () => {
      const pos1 = $slider.superSlider('pointerPosition');
      const pos2 = $slider.superSlider('secondPointerPosition');
      $price.attr('data-value', getPriceAttr(pos1, pos2));
    });
  });
}

rangeSlidersInit();
