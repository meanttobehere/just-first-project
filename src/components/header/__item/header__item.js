function headerItemsInit() {
  document.addEventListener('click', (event) => {
    const title = event.target.closest('.js-header-item__title-container');
    const currentItem = event.target.closest('.js-header-item');

    if (!title && currentItem) { return; }

    if (title) { currentItem.classList.toggle('header-item_open'); }

    document.querySelectorAll('.js-header-item.header-item_open').forEach((item) => {
      if (item === currentItem) { return; }
      item.classList.remove('header-item_open');
    });
  });
}

headerItemsInit();
