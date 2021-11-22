import RangeSlider from './RangeSlider';

document.querySelectorAll('.js-range-slider').forEach((rangeSlider) => {
  const rangeSliderDOM = rangeSlider;
  rangeSliderDOM.rangeSlider = new RangeSlider(rangeSlider);
});
