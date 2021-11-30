class Header {
  #container;

  #menu;

  #userblock;

  #navbar;

  #hamburger;

  constructor(header) {
    this.#container = header.querySelector('.js-header__container');
    this.#menu = header.querySelector('.js-header__menu-icon');
    this.#userblock = header.querySelector('.js-header__userblock');
    this.#navbar = header.querySelector('.js-header__navbar');
    this.#hamburger = header.querySelector('.js-hamburger').hamburger;

    this.#init();
  }

  #init() {
    this.#menu.addEventListener('click', this.#handleMenuClick.bind(this));

    const widthQuery = window.matchMedia('(min-width: 600px)');
    widthQuery.addEventListener('change', this.#handleQueryWidth.bind(this));

    this.#changeHierarchy(widthQuery.matches);
  }

  #handleMenuClick() {
    this.#navbar.classList.toggle('header__navbar_open');
    this.#hamburger.change();
  }

  #handleQueryWidth(event) {
    this.#changeHierarchy(event.matches);
  }

  #changeHierarchy(isDesktopView) {
    if (isDesktopView) { this.#container.appendChild(this.#userblock); }
    else { this.#navbar.appendChild(this.#userblock); }
  }
}

export default Header;
