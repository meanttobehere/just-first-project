import { getFormattedPrice } from '../summary-form/summary-form';
import './lib/slider';

class RangeSlider{
  #price;
  #slider;

  constructor(rangeSlider){
    this.#price = $(rangeSlider).find('.js-range-slider__price');
    this.#slider = $(rangeSlider).find('.js-range-slider__slider');
    this.#slider.superSlider(this._getSliderInitObject(this.#slider));
    this.#slider.on('sliderupdate', this._handleSliderUpdate.bind(this));
    this._updatePrice();
  }

  _getSliderInitObject($slider){
    const val1 = parseInt($slider.attr('data-val1'), 10);
    const val2 = parseInt($slider.attr('data-val2'), 10);
    const step = parseInt($slider.attr('data-step'), 10);
    const min = parseInt($slider.attr('data-min'), 10);
    const max = parseInt($slider.attr('data-max'), 10);

    return {
      displayTips: false,
      pointerPosition: val1,
      secondPointerPosition: val2,
      minValue: min,
      maxValue: max,
      step: step,
    }
  }

  _updatePrice(){
    const pos1 = this.#slider.superSlider('pointerPosition');
    const pos2 = this.#slider.superSlider('secondPointerPosition');
    this.#price.attr('data-value', this._getPriceAttr(pos1, pos2));
  }

  _handleSliderUpdate(event){
    this._updatePrice();
  }

  _getPriceAttr(val1, val2) {
    return (
      `${this._getFormattedPrice(val1)} - ${this._getFormattedPrice(val2)}`
    );
  }

  _getFormattedPrice(price) {
    const str = price.toString();
    return `${str.substr(0, str.length - 3)} ${str.substr(-3)}₽`;
  }
}

document.querySelectorAll('.js-range-slider').forEach(rangeSlider => {
  rangeSlider._rangeSlider = new RangeSlider(rangeSlider);
})