import css from "styles.css";
import html from "./index.html";
import galleryItems  from './js/galleryElem';
import createGalleryCardsMarkup from './js/createMarkup';

// import refs  from './js/createMarkup';
const refs = {
    galleryList: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    modalCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
    modalCloseOverlay: document.querySelector('.lightbox__overlay'),

}


const galleryMarkup = createGalleryCardsMarkup(galleryItems);
// Функция рендеринга разметки 



// Вешаем созданную динамическ разметку на существующий єлемент
refs.galleryList.insertAdjacentHTML('beforeend', galleryMarkup);
// Вешаем слушателя события на список
refs.galleryList.addEventListener('click', onGalleryListClick)
function onGalleryListClick(evt) {
    // Фильтр цели клика
    const isGalleryImageEl = evt.target.classList.contains('gallery__image');
    if (!isGalleryImageEl) {
        return;
    }
    evt.preventDefault();

    // Вешаем слушателя события на модальное окно
    refs.modal.classList.add('is-open');
    refs.lightboxImage.src = evt.target.dataset.source;
    refs.lightboxImage.alt = evt.target.alt;
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalClose();
        }
    });

}

// закрытие модального окна кнопкой
refs.modalCloseOverlay.addEventListener('click', modalClose);
refs.modalCloseBtn.addEventListener('click', modalClose);
function modalClose(evt) {
    refs.modal.classList.remove('is-open');
    refs.lightboxImage.src = "";
    refs.lightboxImage.alt = "";
    window.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalClose();
        }
    });
}
// if(!refs.modal.classList.contains]('is-open')

// ){
    

// }
// console.log('Test');
// import qwe from './js/validate-password';

// console.log(qwe);

// import allService from './js/api-service';

// console.log(allService);
// import {fetchAllUsers,
//     x as value,
//     y as name} from './js/api-service';
// console.log(fetchAllUsers);
// console.log(value);
// console.log(name);
import * as apiService from './js/api-service';

console.log(apiService);
import { addUser } from './js/api-service';
addUser('mango');



