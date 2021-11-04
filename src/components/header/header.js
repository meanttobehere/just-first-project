import './__item/header__item';

function headersInit() {
  const headers = document.getElementsByClassName('js-header__container');
  const mediaQueryList = window.matchMedia('(min-width: 600px)');

  for (let i = 0; i < headers.length; i += 1) {
    const menu = headers[i].querySelector('.js-header__menu-icon');
    const userblock = headers[i].querySelector('.js-header__userblock');
    const navbar = headers[i].querySelector('.js-header__navbar');

    menu.addEventListener('click', () => {
      navbar.classList.toggle('header__navbar_open');
      menu.children[0].classList.toggle('hamburger_active');
    });

    const changeHeader = (isDesktopView) => {
      if (isDesktopView) {
        headers[i].appendChild(userblock);
        const [button1, button2] = userblock.getElementsByClassName('button');
        [button1, button2].forEach((button) => {button.classList.remove('button_size-xl')});       
      } else {
        navbar.appendChild(userblock);
        const [button1, button2] = userblock.getElementsByClassName('button');
        [button1, button2].forEach((button) => {button.classList.add('button_size-xl')}); 
      }
    };

    changeHeader(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', (e) => {
      changeHeader(e.matches);
    });
  }
}

headersInit();
