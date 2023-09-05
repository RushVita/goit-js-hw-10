import axios from 'axios';
import { elements } from '..git';
import { Report } from 'notiflix/build/notiflix-report-aio';
axios.defaults.headers.common['x-api-key'] =
  'live_Fa0VZmVHY8vDS2Ti9ijgWVGVxLkOw8u9KdTWWthGy9DuWpfSx9GmaI5cLJc3aEFB';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(resp => {
      console.log(resp);
      return resp.data;
    })
    .catch(err => {
      elements.loader.display = 'none';
      return Report.failure('Oops!', `Something went wrong!`, 'Try again');
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(resp => {
      console.log(resp.data);
      return resp.data;
    })
    .catch(err => {
      return Report.failure('Oops!', `Try reloading the page!`, 'Try again');
    });
}
