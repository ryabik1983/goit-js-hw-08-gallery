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

const galleryList = document.querySelector('.js-gallery');

const galleryMarkup = createGalleryCardsMarkup(galleryItems);
// Вешаем созданную динамическ разметку на существующий єлемент
galleryList.insertAdjacentHTML('beforeend', galleryMarkup);
// Функция рендеринга разметки 
function createGalleryCardsMarkup(items) {
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

// Вешаем слушателя события на список
galleryList.addEventListener('click', onGalleryListClick)
function onGalleryListClick(evt) {
    // Фильтр цели клика
    const isGalleryImageEl = evt.target.classList.contains('gallery__image');
    if (!isGalleryImageEl) {
        return;
    }
    evt.preventDefault();
    console.log('Открываем модальное окно');

    // console.log(evt.target.dataset.source);
    
    // Вешаем слушателя события на модальное окно
    const modal = document.querySelector('.js-lightbox');
    console.log(modal);    
    modal.classList.add('is-open');
    const lightboxImage = document.querySelector('.lightbox__image');
    console.log(lightboxImage.src = evt.target.dataset.source);
    console.log(lightboxImage.alt = evt.target.alt);
}
// закрытие модального окна
const modalClose = document.querySelector('[data-action="close-lightbox"]');
console.log(modalClose);
modalClose.addEventListener('click', onModalCloseClick);
function onModalCloseClick (evt){
    const modal = document.querySelector('.js-lightbox');
    console.log(modal);        
    modal.classList.remove('is-open');
    console.log(modal);
}





