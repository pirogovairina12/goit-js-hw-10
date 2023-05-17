import './css/styles.css';
import debounce from 'lodash.debounce';
import API from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSearch: document.getElementById('search-box'),
  cardContainer: document.querySelector('.country-list'),
  cardContainerInfo: document.querySelector('.country-info'),
};

refs.inputSearch.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(e) {
  e.preventDefault();

  let name = e.target.value.trim();


  API.fetchCountries(name)
    .then(countries =>{
      renderByConditions(countries);
    })

    .catch(error => {
      if(error.message==="404"){
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });

  if (name === '') {
    refs.cardContainer.innerHTML = '';
    refs.cardContainerInfo.innerHTML = '';
  }
}

function renderByConditions(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    refs.cardContainerInfo.innerHTML = '';
    refs.cardContainer.innerHTML = '';
  } else if (countries.length >= 2 && countries.length <= 10) {
    refs.cardContainerInfo.innerHTML = '';
    renderNameCountries(countries);
  } else if (countries.length === 1) {
    renderNameCountries(countries);
    renderCountries(countries);
  }
}


function renderNameCountries(name) {
  const markup = name
    .map(({ name, flags }) => {
      return `<li class='list-country'><img class='flag-img' src = '${flags.svg}'/><h2 class='country-title'>${name.official}</h2></li>`;
    })
    .join('');
  refs.cardContainer.innerHTML = markup;
}


function renderCountries(name) {
  const markup = name

    .map(({ capital, population, languages }) => {
      const countryLanguage = Object.values(languages)
        .join('');
      return `
<div class='title'><h2 class='span'>Capital: </h2>${capital}</div>
<div class='title'><h2 class='span'>Population:</h2> ${population}</div>
<div class='title'><h2 class='span'>Languages:</h2> ${countryLanguage}</div>`;
    })
    .join('');

  refs.cardContainerInfo.innerHTML = markup;
}

