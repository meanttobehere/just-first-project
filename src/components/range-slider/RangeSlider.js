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
    const [val1, val2, stepVal, min, max] = [
      'data-val1',
      'data-val2',
      'data-step',
      'data-min',
      'data-max',
    ].map((item) => parseInt(this.#$slider.attr(item), 10));

    return {
      shouldDisplayTips: false,
      pointerPosition: val1,
      secondPointerPosition: val2,
      minValue: min,
      maxValue: max,
      step: stepVal,
    };
  }

  #updatePrice() {
    const {
      pointerPosition,
      secondPointerPosition
    } = this.#$slider.data('sliderInterface').getOptions();

    const priceAttr = RangeSlider.#getPriceAttr(pointerPosition, secondPointerPosition);

    this.#$price.attr('data-value', priceAttr);
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
    return `${price.toLocaleString('ru-RU')}₽`;
  }
}

export default RangeSlider;
