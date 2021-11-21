class Footer {
  constructor(footer) {
    const groups = footer.querySelectorAll('.js-footer__group');
    groups.forEach((group) => {
      const title = group.querySelector('.js-footer__group-title');
      title.addEventListener('click', this.#handleTitleClick.bind(group));
    });
  }

  #handleTitleClick() {
    const group = this;
    group.classList.toggle('footer__group_open');
    if (group.classList.contains('footer__group_open')) {
      group.style.maxHeight = `${group.scrollHeight}px`;
    } else {
      group.style.maxHeight = '16px';
    }
  }
}

document.querySelectorAll('.js-footer').forEach((footer) => {
  const footerDOM = footer;
  footerDOM.footer = new Footer(footer);
});
