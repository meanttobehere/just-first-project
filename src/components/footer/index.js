import Footer from './Footer';

document.querySelectorAll('.js-footer').forEach((footer) => {
  const footerDOM = footer;
  footerDOM.footer = new Footer(footer);
});
