function chechboxListsInit() {
  const checkboxLists = document.getElementsByClassName('js-checkbox-list checkbox-list_expandable');

  for (let i = 0; i < checkboxLists.length; i += 1) {
    const title = checkboxLists[i].querySelector('.js-checkbox-list__title');

    title.onclick = function titleClickHandler() {
      checkboxLists[i].classList.toggle('checkbox-list_open');
    };
  }
}

chechboxListsInit();
