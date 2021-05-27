import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

import '../src/styles.css';
import countryCardTpl from './countryCardTpl.hbs';
import countryListTpl from './countryListTpl.hbs';
import fetchCountry from './fetchCountries';

const input = document.querySelector('input');
const cardContainer = document.querySelector('.card-container');

input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange() {
  let searchQuery = input.value;

  cardContainer.innerHTML = '';
  if (input.value !== '' && input.value !== ' ' && input.value !== '.') {
    fetchCountry(searchQuery).then(data => {
      if (data.status === 404) {
        pontyfyMassage('Nothing was found for your query!');
      } else if (data.length > 10) {
        pontyfyMassage('Too many matches found. Please enter more specific query!');
      } else if (data.length === 1) {
        const resultsMarkup = createMenuItemsMarkup(data);
        cardContainer.insertAdjacentHTML('beforeend', resultsMarkup);
      } else if (2 <= data.length <= 10) {
        const resList = createItemsList(data);
        cardContainer.insertAdjacentHTML('beforeend', resList);
      }
    });
  }
}

function createMenuItemsMarkup(data) {
  return countryCardTpl(data);
}
function createItemsList(data) {
  return countryListTpl(data);
}
function pontyfyMassage(message) {
  error({
    title: `${message}`,
    delay: 1200,
  });
}
