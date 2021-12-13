class Header {
  #container;

  #menu;

  #userblock;

  #navbar;

  #hamburger;

  #bodyParams;

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
    this.#navbar.classList.add(Header.#classNavbarOpen);
    this.#hamburger.change();
    this.#lockBodyScroll();
    document.addEventListener('click', this.#handleDocumentClick);
  }

  #close() {
    this.#navbar.classList.remove(Header.#classNavbarOpen);
    this.#hamburger.change();
    this.#unlockBodyScroll();
    document.removeEventListener('click', this.#handleDocumentClick);
  }

  get #isOpen() {
    return this.#navbar.classList.contains(Header.#classNavbarOpen);
  }

  #handleDocumentClick = (event) => {
    const container = event.target.closest('.js-header__container');
    const isClickOutside = container !== this.#container;
    if (isClickOutside) { this.#close(); }
  };

  #handleQueryWidth(event) {
    this.#changeHierarchy(event.matches);
  }

  #changeHierarchy(isDesktopView) {
    if (isDesktopView) {
      this.#container.appendChild(this.#userblock);
    } else {
      this.#navbar.appendChild(this.#userblock);
    }
  }

  #lockBodyScroll() {
    this.#bodyParams = {
      overflow: document.body.style.overflow,
      blockSize: document.body.style.blockSize,
    };
    document.body.style.overflow = 'hidden';
    document.body.style.blockSize = '100%';
  }

  #unlockBodyScroll() {
    document.body.style.overflow = this.#bodyParams.overflow;
    document.body.style.blockSize = this.#bodyParams.blockSize;
  }

  static #classNavbarOpen = 'header__navbar_open';
}

export default Header;
