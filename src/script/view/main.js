import '../component/doa-list';
import '../component/search-bar';
import '../component/back-button';
import DataSource from '../data/data-source';

const main = () => {
  const searchElement = document.querySelector('search-bar');
  const doaListElement = document.querySelector('doa-list');
  const backButtonElement = document.querySelector('back-button');

  let originalDoas = [];

  const renderResult = (result) => {
    const doasArray = Array.isArray(result) ? result : [result];
    doaListElement.doas = doasArray;
  };

  const fallbackResult = (message) => {
    doaListElement.renderError(message);
  };

  const renderLoading = () => {
    doaListElement.renderLoading();
  };

  const toggleBackButtonVisibility = (visible) => {
    backButtonElement.style.display = visible ? 'block' : 'none';
  };

  const fetchData = () => {
    toggleBackButtonVisibility(false);
    renderLoading();
    DataSource.getDoa()
      .then((result) => {
        originalDoas = result;
        renderResult(result);
      })
      .catch(fallbackResult);
  };

  const searchLocalDoas = (keyword) => originalDoas.filter((doa) => doa.title.toLowerCase().includes(keyword.toLowerCase()));

  const onButtonSearchClicked = () => {
    const searchTerm = searchElement.value.trim();
    if (searchTerm !== '') {
      toggleBackButtonVisibility(true);
      const searchResults = searchLocalDoas(searchTerm);
      renderResult(searchResults);
    } else {
      fallbackResult('Please enter a search term.');
    }
  };

  const onButtonBackClicked = () => {
    toggleBackButtonVisibility(false);
    renderResult(originalDoas);
  };

  fetchData();

  searchElement.clickEvent = onButtonSearchClicked;
  backButtonElement.clickEvent = onButtonBackClicked;
};

export default main;
