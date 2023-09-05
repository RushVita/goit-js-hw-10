import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import { Report } from 'notiflix/build/notiflix-report-aio';

export const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

const axios = require('axios').default;

function createOptions(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

fetchBreeds()
  .then(resp => {
    elements.select.innerHTML = createOptions(resp);
    elements.loader.style.display = 'none';
    elements.select.style.display = 'block';
  })
  .catch(err => {
    return Report.failure(
      'Error',
      `Oops! Something went wrong! Try reloading the page!`,
      'Okay'
    );
  });

elements.select.addEventListener('change', handlerSelect);

function handlerSelect(evt) {
  elements.loader.style.display = 'inline-block';
  elements.catInfo.style.display = 'none';

  fetchCatByBreed(evt.currentTarget.value)
    .then(resp => {
      elements.loader.style.display = 'none';
      elements.catInfo.style.display = 'block';
      createMarkup(resp);
    })
    .catch(err => {
      return   Report.failure(
        'Error',
        `Oops! Something went wrong! Try reloading the page!`,
        'Okay'
      );
    });
}

function createMarkup(catImg) {
  return catImg.map(cat => {
    const { temperament, description, name } = cat.breeds[0];
    elements.catInfo.innerHTML = `<img class="cat-img" src="${cat.url}" alt="">
   <h2>${name}</h2>
   <p>${description}</p>
  <p>Temperament:${temperament}</p>`;
  });

  // fetchBreeds().then(resp => {
  //   for (let i = 0; i < resp.length; i++) {
  //     if (evt.target.value === resp[i].id) {
  //       elements.catInfo.insertAdjacentHTML(
  //         'beforeend',
  //         `<h2>${resp[i].name}</h2><p>${resp[i].description}</p><p>Temperament:${resp[i].temperament}</p>`
  //       );
  //     }
  //   }
  // });
}
