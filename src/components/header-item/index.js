import HeaderItem from './HeaderItem';

document.querySelectorAll('.js-header-item').forEach((headerItem) => {
  const headerItemDOM = headerItem;
  headerItemDOM.headerItem = new HeaderItem(headerItem);
});
