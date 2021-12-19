import debounce from 'lodash.debounce';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
import animalCard from '../templates/card.hbs';
import Notiflix from 'notiflix';
import NewsApiService from '../js/new-service';

const newsApiService = new NewsApiService();
const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  btnEn: document.querySelector('.box-btn'),
  btnMore: document.querySelector('.btn-more'),
};
refs.form.addEventListener('submit', onFormSubmit);
refs.btnMore.addEventListener('click', onBtnClick);

function onBtnClick(evt) {
  evt.preventDefault();
  newsApiService.fetchArticles().then(markupHits);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  btnHidden();
  let a;
  const formData = new FormData(evt.currentTarget);
  formData.forEach(name => {
    a = name;
    return a;
  });

  newsApiService.query = a;
  newsApiService.resetPage();
  clearArticlesContainer();
  newsApiService.fetchArticles().then(markupHits).then(btnEn()).catch(onFetchError);
}

function markupHits(hits) {
  const markup = animalCard(hits);
  // refs.gallery.innerHTML = markup;
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function onFetchError(error) {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
  );
  
    btnHidden();
}

function onFetchOops(oops) {
  clearCountries();
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

const lightbox = new SimpleLightbox('.gallery a', {
  nav: true,
  captions: true,
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  infinite: false,
});

function clearArticlesContainer() {
  refs.gallery.innerHTML = '';
}

function btnEn() {
    refs.btnEn.classList.add('is-hidden');
  if (refs.btnEn.classList.contains('is-hidden')) {
    refs.btnEn.classList.remove('is-hidden')
    // setTimeout(() => {
    //   refs.btnEn.classList.remove('is-hidden');
    // }, 1000);
  }
}
function btnHidden(){
    refs.btnEn.classList.add('is-hidden');
}
// const url = 'https://pixabay.com/api';
// const options = {
//     headers: {
//         key: `${API_KEY}`,
//         q: 'cat',
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: 'true',
//          per_page:40,
//     }
// }
