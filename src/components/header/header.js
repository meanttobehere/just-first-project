import './__item/header__item';

class Header{
  #container;
  #menu;
  #userblock;
  #navbar;
  #buttons;

  constructor(header){
    this.#container = header.querySelector('.js-header__container');
    this.#menu = header.querySelector('.js-header__menu-icon');
    this.#userblock = header.querySelector('.js-header__userblock');
    this.#navbar = header.querySelector('.js-header__navbar');
    this.#buttons = this.#userblock.querySelectorAll('.button');

    this.#menu.addEventListener('click', this._handleMenuClick.bind(this));

    const widthQuery = window.matchMedia('(min-width: 600px)');
    this._changeHierarchy(widthQuery.matches);
    widthQuery.addEventListener('change', this._handleQueryWidth.bind(this));
  }

  _handleMenuClick(){
    this.#navbar.classList.toggle('header__navbar_open');
    this.#menu.children[0].classList.toggle('hamburger_active');
  }

  _handleQueryWidth(event){
    this._changeHierarchy(event.matches);
  }

  _changeHierarchy(isDesktopView){
    if (isDesktopView) {
      this.#container.appendChild(this.#userblock);
      this.#buttons.forEach((button) => {
        button.classList.remove('button_size-xl')
      });
    } else {
      this.#navbar.appendChild(this.#userblock);
      this.#buttons.forEach((button) => {
        button.classList.add('button_size-xl')
      });
    }
  }
}

document.querySelectorAll('.js-header').forEach(header => {
  header._header = new Header(header);
})