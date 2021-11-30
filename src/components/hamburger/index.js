import Hamburger from './Hamburger';

document.querySelectorAll('.js-hamburger').forEach((hamburger) => {
  const hamburgerDOM = hamburger;
  hamburgerDOM.hamburger = new Hamburger(hamburger);
});
