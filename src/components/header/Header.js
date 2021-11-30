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
    if (this.#isOpen) { this.#close(); } else { this.#open(); }
  }

  #open() {
    this.#navbar.classList.add('header__navbar_open');
    this.#hamburger.change();
    document.addEventListener('click', this.#handleDocumentClick);
  }

  #close() {
    this.#navbar.classList.remove('header__navbar_open');
    this.#hamburger.change();
    document.removeEventListener('click', this.#handleDocumentClick);
  }

  get #isOpen() {
    return this.#navbar.classList.contains('header__navbar_open');
  }

  #handleDocumentClick = (event) => {
    const container = event.target.closest('.js-header__container');
    const clickWasOutside = container !== this.#container;
    if (clickWasOutside) { this.#close(); }
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
