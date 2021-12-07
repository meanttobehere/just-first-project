import SearchPage from './SearchPage';

document.querySelectorAll('.js-search-page').forEach((searchPage) => {
  const searchPageDOM = searchPage;
  searchPageDOM.searchPage = new SearchPage(searchPage);
});
