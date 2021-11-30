class Hamburger {
  #hamburger;

  constructor(hamburger) {
    this.#hamburger = hamburger;
  }

  change() {
    this.#hamburger.classList.toggle('hamburger_active');
  }
}

export default Hamburger;
