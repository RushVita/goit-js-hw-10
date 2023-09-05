import axios from 'axios';
import { elements } from '..';
import { Report } from 'notiflix/build/notiflix-report-aio';
axios.defaults.headers.common['x-api-key'] =
  'live_Fa0VZmVHY8vDS2Ti9ijgWVGVxLkOw8u9KdTWWthGy9DuWpfSx9GmaI5cLJc3aEFB';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(resp => {
    return resp.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(resp => {
      return resp.data;
    });
}
