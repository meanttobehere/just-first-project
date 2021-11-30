/* eslint-disable-next-line import/no-extraneous-dependencies */
import 'slider/dist/lib/slider';

class RangeSlider {
  #$price;

  #$slider;

  constructor(rangeSlider) {
    this.#$price = $(rangeSlider).find('.js-range-slider__price');
    this.#$slider = $(rangeSlider).find('.js-range-slider__slider');

    this.#init();
  }

  #init() {
    this.#$slider.superSlider(this.#getSliderInitObject());
    this.#$slider.on('sliderupdate', this.#handleSliderUpdate.bind(this));
    this.#updatePrice();
  }

  #getSliderInitObject() {
    const val1 = parseInt(this.#$slider.attr('data-val1'), 10);
    const val2 = parseInt(this.#$slider.attr('data-val2'), 10);
    const step = parseInt(this.#$slider.attr('data-step'), 10);
    const min = parseInt(this.#$slider.attr('data-min'), 10);
    const max = parseInt(this.#$slider.attr('data-max'), 10);

    return {
      displayTips: false,
      pointerPosition: val1,
      secondPointerPosition: val2,
      minValue: min,
      maxValue: max,
      step,
    };
  }

  #updatePrice() {
    const pos1 = this.#$slider.superSlider('pointerPosition');
    const pos2 = this.#$slider.superSlider('secondPointerPosition');
    this.#$price.attr('data-value', RangeSlider.#getPriceAttr(pos1, pos2));
  }

  #handleSliderUpdate() {
    this.#updatePrice();
  }

  static #getPriceAttr(val1, val2) {
    return (
      `${RangeSlider.#getFormattedPrice(val1)} - ${RangeSlider.#getFormattedPrice(val2)}`
    );
  }

  static #getFormattedPrice(price) {
    const str = price.toString();
    return `${str.substr(0, str.length - 3)} ${str.substr(-3)}₽`;
  }
}

export default RangeSlider;
