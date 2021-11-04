function footersInit() {
  const footers = document.getElementsByClassName('js-footer');

  for (let i = 0; i < footers.length; i += 1) {
    const groups = footers[i].getElementsByClassName('js-footer__group');

    for (let j = 0; j < groups.length; j += 1) {
      const group = groups[j];
      const title = group.querySelector('.js-footer__group-title');

      title.onclick = () => {
        group.classList.toggle('footer__group_open');
        if (group.classList.contains('footer__group_open')) { group.style.maxHeight = `${group.scrollHeight}px`; } else { group.style.maxHeight = '16px'; }
      };
    }
  }
}

footersInit();
