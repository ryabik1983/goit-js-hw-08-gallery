// import galleryItems  from './js/galleryElem';
import createGalleryCardsMarkup from './js/createMarkup';

import refs  from './js/createMarkup';

const galleryItems = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];
const refs = {
    galleryList: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    modalCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
    modalCloseOverlay: document.querySelector('.lightbox__overlay'),

}


const galleryMarkup = createGalleryCardsMarkup(galleryItems);
// Функция рендеринга разметки 
function createGalleryCardsMarkup (items) {
    return items
        .map(({ preview, original, description }) => {
            return `
    
    <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
        }
        )
        .join('');
}


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
// import * as apiService from './js/api-service';

// console.log(apiService);
// import { addUser } from './js/api-service';
// addUser('mango');
// import "./js/localstorage.js";
// console.log(localStorage);
// localStorage.setItem('my-data', JSON.stringify({
//     "name": "Josh",
//     "weight": 175,
//     "age": 30,
//     "eyecolor": "brown",
//     "isHappy": true,
//     "cars": ["Chevy", "Honda"],
//     "favoriteBook": {
//       "title": "When the Fire Nation Attacked",
//       "author": "Nickelodeon",
//       "released": "02-21-2005"
//     }
//   }));
//   console.log(localStorage.getItem('my-data'));
//   ;

//   const json = '{"name":"Mango","age":3,"isHappy":true}';

// const dog = JSON.parse(json);
// console.log(dog); // {name: "Mango", age: 3, isHappy: true}

// console.log(sessionStorage);

// const user = {
//     name: 'Sandra',
//     age: 31,
//     skills: ['HTML', 'Css'],
// }
// console.log('user', user)

// // console.log(JSON)
//  const jsonUser = JSON.stringify(user);
//  console.log(jsonUser);

//  const backJsonUser = JS    ON.parse(jsonUser);
// console.log(backJsonUser);


  
