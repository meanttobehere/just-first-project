class Footer{
  constructor(footer){
    const groups = footer.querySelectorAll('.js-footer__group');
    groups.forEach(group => {
      group.querySelector('.js-footer__group-title').onclick
        = this._handleTitleClick.bind(group);
    });
  }

  _handleTitleClick(){
    const group = this;
    group.classList.toggle('footer__group_open');
    if (group.classList.contains('footer__group_open')) { 
      group.style.maxHeight = `${group.scrollHeight}px`; 
    } else { 
      group.style.maxHeight = '16px'; 
    }
  }
}

document.querySelectorAll('.js-footer').forEach(footer => {
  footer._footer = new Footer(footer);
})