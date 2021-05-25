import { debounce } from 'lodash';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

import '../src/styles.css';
import countryCardTpl from './countryCardTpl.hbs';
import countryListTpl from './countryListTpl.hbs';
import fetchCountry from './fetchCountries';

const inputEl = document.querySelector('input');
const cardContainer = document.querySelector('.card-container');

inputEl.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  resetPage();
  const searchQuery = e.target.value;
  fetchCountry(searchQuery)
    .then(countries => {
      if (countries.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
          mode: 'light',
          closer: true,
          sticker: false,
          hide: true,
          delay: 2000,
        });
        return;
      }
      if (countries.length <= 10 && countries.length > 1) {
        renderCountriesList(countries);
        return;
      }
      if (countries.length === 1) {
        renderCountryCard(countries);
        return;
      }
    })
    .catch(onFetchError);
}

function renderCountryCard(country) {
  const contryCardMarkup = countryCardTpl(country);
  cardContainer.innerHTML = contryCardMarkup;
}

function renderCountriesList(countries) {
  const contriesList = countryListTpl(countries);
  cardContainer.innerHTML = contriesList;
}

function resetPage() {
  cardContainer.innerHTML = '';
}

function onFetchError(err) {
  error({
    text: `${err}`,
    mode: 'dark',
    closer: true,
    sticker: false,
    hide: true,
    delay: 2000,
  });
}

// import { debounce } from 'lodash.debounce';
// import { error } from '@pnotify/core';
// import '@pnotify/core/dist/BrightTheme.css';

// import './sass/main.scss';
// import countryCardTpl from './countryCardTpl.hbs';
// import countryListTpl from './countryListTpl.hbs';
// import fetchCountry from './fetchCountries';

// const refs = {
//   input: document.querySelector('input'),
//   cardContainer: document.querySelector('.card-container'),
// };

// refs.input.addEventListener('input', debounce(onInput, 500));

// function onInput(event) {
//   //const inputText = refs.input.value;
//   resetPage();
//   const searchQuery = event.turget.value;

//   fetchCountry(searchQuery)
//     .then(countries => {
//       if (countries.length > 10) {
//         error({
//           text: 'Too many matches found. Please enter a more specific querty!',
//           mode: 'light',
//           closer: true,
//           sticker: false,
//           hide: true,
//           delay: 2000,
//         });
//         return;
//       }
//       if (countries.length <= 10 && countries.length > 1) {
//         renderCountriesList(countries);
//         return;
//       }

//       if (countries.length === 1) {
//         renderCountryCard(countries);
//         return;
//       }
//     })
//     .catch(onFetchError);
// }

// function renderCountryCard(country) {
//   const countryCardMarkup = countryCardTpl(country);
//   refs.cardContainer.innerHTML = countryCardMarkup;
// }

// function renderCountriesList(countries) {
//   const countriesList = countryListTpl(countries);
//   refs.cardContainer.innerHTML = countriesList;
// }

// function resetPage() {
//   refs.cardContainer.innerHTML = '';
// }

// function onFetchError(err) {
//   error({
//     text: `${err}`,
//     mode: 'dark',
//     closer: true,
//     sticker: false,
//     hide: true,
//     delay: 2000,
//   });
// }
