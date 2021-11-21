import './__item/header__item';

class Header {
  #container;

  #menu;

  #userblock;

  #navbar;

  #buttons;

  constructor(header) {
    this.#container = header.querySelector('.js-header__container');
    this.#menu = header.querySelector('.js-header__menu-icon');
    this.#userblock = header.querySelector('.js-header__userblock');
    this.#navbar = header.querySelector('.js-header__navbar');
    this.#buttons = this.#userblock.querySelectorAll('.button');

    this._init();
  }

  _init() {
    this.#menu.addEventListener('click', this._handleMenuClick.bind(this));

    const widthQuery = window.matchMedia('(min-width: 600px)');
    widthQuery.addEventListener('change', this._handleQueryWidth.bind(this));

    this._changeHierarchy(widthQuery.matches);
  }

  _handleMenuClick() {
    this.#navbar.classList.toggle('header__navbar_open');
    this.#menu.children[0].classList.toggle('hamburger_active');
  }

  _handleQueryWidth(event) {
    this._changeHierarchy(event.matches);
  }

  _changeHierarchy(isDesktopView) {
    if (isDesktopView) {
      this.#container.appendChild(this.#userblock);
      this.#buttons.forEach((button) => {
        button.classList.remove('button_size-xl');
      });
    } else {
      this.#navbar.appendChild(this.#userblock);
      this.#buttons.forEach((button) => {
        button.classList.add('button_size-xl');
      });
    }
  }
}

document.querySelectorAll('.js-header').forEach((header) => {
  header._header = new Header(header);
});
