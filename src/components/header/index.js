import './__item/index';
import Header from './Header';

document.querySelectorAll('.js-header').forEach((header) => {
  const headerDOM = header;
  headerDOM.header = new Header(header);
});
