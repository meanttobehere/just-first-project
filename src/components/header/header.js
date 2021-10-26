import headeMenu from './header__menu.svg';
import './__item/header__item';
import '../logotype/logotype';
import '../button/button';

function headersInit() {
  const headers = document.getElementsByClassName('js-header__container');
  const mediaQueryList = window.matchMedia('(min-width: 600px)');

  for (let i = 0; i < headers.length; i += 1) {
    const menu = headers[i].querySelector('.js-header__menu-icon');
    const userblock = headers[i].querySelector('.js-header__userblock');
    const navbar = headers[i].querySelector('.js-header__navbar');

    menu.addEventListener('click', () => {
      navbar.classList.toggle('header__navbar_open');
    });

    const changeHeader = (isDesktopView) => {
      if (isDesktopView) {
        headers[i].appendChild(userblock);
      } else {
        navbar.appendChild(userblock);
      }
    };

    changeHeader(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', (e) => {
      changeHeader(e.matches);
    });
  }
}

headersInit();
