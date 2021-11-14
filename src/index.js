import './sass/main.scss';
import cardTemplate from './templates/card-template.hbs';
import PhotoCardsApi from './js/apiService.js'
import LoadMoreBtn from './js/load-more-btn.js'
import { notice } from '@pnotify/core'
import '@pnotify/core/dist/BrightTheme.css';


const searchFormEl = document.querySelector('.js-search-form')
const photoCardsBlockEl = document.querySelector('.js-gallery')

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const photoCardsApi = new PhotoCardsApi();

searchFormEl.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchPhotos);

function onSearch(e) {
  e.preventDefault();

    photoCardsApi.query = e.currentTarget.elements.query.value
        console.log(e.currentTarget.elements.query.value);

  if (photoCardsApi.query === '') {
    return errorMessage('Введите значение для поиска');
  }

  loadMoreBtn.show();
  photoCardsApi.resetPage();
  clearPhotoCardsBlock();
  fetchPhotos();
}

function fetchPhotos() {
  loadMoreBtn.disable();
    photoCardsApi.fetchPhotoCards()

        .then(photoCards => {
            renderPhotoCards(photoCards);
            loadMoreBtn.enable();
            loadMoreBtn.refs.button.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
  });
}

function renderPhotoCards(photoCards) {
  photoCardsBlockEl.insertAdjacentHTML('beforeend', cardTemplate(photoCards));
}

function clearPhotoCardsBlock() {
  photoCardsBlockEl.innerHTML = '';
}


function errorMessage(message) {
    notice({
            addClass: 'modal',
            text: `${message}`,
            title: false,
            icon: false,
            closer: false,
            sticker: false,
            delay: 0,
            });
}