import Notiflix from 'notiflix';
import { fetchBreeds } from './js/cat-api';
import { fetchCatByBreed } from './js/cat-api';
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
  .then(data => {
    elements.loader.style.display = 'none';
    elements.select.style.display = 'block';
    elements.select.innerHTML = createOptions(data);
  })
  .catch(err => {
    elements.loader.style.display = 'none';
    elements.select.style.display = 'block';
    return Report.failure('Oops!', `Something went wrong!`, 'Try again');
  });

elements.select.addEventListener('change', handlerSelect);

function handlerSelect(evt) {
  elements.loader.style.display = 'inline-block';
  elements.catInfo.style.display = 'none';

  fetchCatByBreed(evt.currentTarget.value)
    .then(data => {
      elements.loader.style.display = 'none';
      elements.catInfo.style.display = 'block';
      if (data.length === 0) {
        throw new Error('Error');
      }

      createMarkup(data);
    })
    .catch(error => {
      elements.catInfo.innerHTML = '';
      return Report.failure(
        'Oops!',
        `Try a different breed of cat!`,
        'Try again'
      );
    });
}

function createMarkup(catImg) {
  return catImg.map(cat => {
    const { temperament, description, name } = cat.breeds[0];
    elements.catInfo.innerHTML = `<img width="400px"; src="${cat.url}" alt="">
   <h2>${name}</h2>
   <p>${description}</p>
  <p>Temperament:${temperament}</p>`;
  });
}
