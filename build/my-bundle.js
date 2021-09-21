/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/shortid/index.js":
/*!***************************************!*\
  !*** ./node_modules/shortid/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nmodule.exports = __webpack_require__(/*! ./lib/index */ \"./node_modules/shortid/lib/index.js\");\n\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./node_modules/shortid/index.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/alphabet.js":
/*!**********************************************!*\
  !*** ./node_modules/shortid/lib/alphabet.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar randomFromSeed = __webpack_require__(/*! ./random/random-from-seed */ \"./node_modules/shortid/lib/random/random-from-seed.js\");\n\nvar ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';\nvar alphabet;\nvar previousSeed;\n\nvar shuffled;\n\nfunction reset() {\n    shuffled = false;\n}\n\nfunction setCharacters(_alphabet_) {\n    if (!_alphabet_) {\n        if (alphabet !== ORIGINAL) {\n            alphabet = ORIGINAL;\n            reset();\n        }\n        return;\n    }\n\n    if (_alphabet_ === alphabet) {\n        return;\n    }\n\n    if (_alphabet_.length !== ORIGINAL.length) {\n        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);\n    }\n\n    var unique = _alphabet_.split('').filter(function(item, ind, arr){\n       return ind !== arr.lastIndexOf(item);\n    });\n\n    if (unique.length) {\n        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));\n    }\n\n    alphabet = _alphabet_;\n    reset();\n}\n\nfunction characters(_alphabet_) {\n    setCharacters(_alphabet_);\n    return alphabet;\n}\n\nfunction setSeed(seed) {\n    randomFromSeed.seed(seed);\n    if (previousSeed !== seed) {\n        reset();\n        previousSeed = seed;\n    }\n}\n\nfunction shuffle() {\n    if (!alphabet) {\n        setCharacters(ORIGINAL);\n    }\n\n    var sourceArray = alphabet.split('');\n    var targetArray = [];\n    var r = randomFromSeed.nextValue();\n    var characterIndex;\n\n    while (sourceArray.length > 0) {\n        r = randomFromSeed.nextValue();\n        characterIndex = Math.floor(r * sourceArray.length);\n        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);\n    }\n    return targetArray.join('');\n}\n\nfunction getShuffled() {\n    if (shuffled) {\n        return shuffled;\n    }\n    shuffled = shuffle();\n    return shuffled;\n}\n\n/**\n * lookup shuffled letter\n * @param index\n * @returns {string}\n */\nfunction lookup(index) {\n    var alphabetShuffled = getShuffled();\n    return alphabetShuffled[index];\n}\n\nfunction get () {\n  return alphabet || ORIGINAL;\n}\n\nmodule.exports = {\n    get: get,\n    characters: characters,\n    seed: setSeed,\n    lookup: lookup,\n    shuffled: getShuffled\n};\n\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./node_modules/shortid/lib/alphabet.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/build.js":
/*!*******************************************!*\
  !*** ./node_modules/shortid/lib/build.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar generate = __webpack_require__(/*! ./generate */ \"./node_modules/shortid/lib/generate.js\");\nvar alphabet = __webpack_require__(/*! ./alphabet */ \"./node_modules/shortid/lib/alphabet.js\");\n\n// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.\n// This number should be updated every year or so to keep the generated id short.\n// To regenerate `new Date() - 0` and bump the version. Always bump the version!\nvar REDUCE_TIME = 1567752802062;\n\n// don't change unless we change the algos or REDUCE_TIME\n// must be an integer and less than 16\nvar version = 7;\n\n// Counter is used when shortid is called multiple times in one second.\nvar counter;\n\n// Remember the last time shortid was called in case counter is needed.\nvar previousSeconds;\n\n/**\n * Generate unique id\n * Returns string id\n */\nfunction build(clusterWorkerId) {\n    var str = '';\n\n    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);\n\n    if (seconds === previousSeconds) {\n        counter++;\n    } else {\n        counter = 0;\n        previousSeconds = seconds;\n    }\n\n    str = str + generate(version);\n    str = str + generate(clusterWorkerId);\n    if (counter > 0) {\n        str = str + generate(counter);\n    }\n    str = str + generate(seconds);\n    return str;\n}\n\nmodule.exports = build;\n\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./node_modules/shortid/lib/build.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/generate.js":
/*!**********************************************!*\
  !*** ./node_modules/shortid/lib/generate.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar alphabet = __webpack_require__(/*! ./alphabet */ \"./node_modules/shortid/lib/alphabet.js\");\nvar random = __webpack_require__(/*! ./random/random-byte */ \"./node_modules/shortid/lib/random/random-byte-browser.js\");\nvar format = __webpack_require__(/*! nanoid/format */ \"./node_modules/shortid/node_modules/nanoid/format.browser.js\");\n\nfunction generate(number) {\n    var loopCounter = 0;\n    var done;\n\n    var str = '';\n\n    while (!done) {\n        str = str + format(random, alphabet.get(), 1);\n        done = number < (Math.pow(16, loopCounter + 1 ) );\n        loopCounter++;\n    }\n    return str;\n}\n\nmodule.exports = generate;\n\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./node_modules/shortid/lib/generate.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/shortid/lib/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar alphabet = __webpack_require__(/*! ./alphabet */ \"./node_modules/shortid/lib/alphabet.js\");\nvar build = __webpack_require__(/*! ./build */ \"./node_modules/shortid/lib/build.js\");\nvar isValid = __webpack_require__(/*! ./is-valid */ \"./node_modules/shortid/lib/is-valid.js\");\n\n// if you are using cluster or multiple servers use this to make each instance\n// has a unique value for worker\n// Note: I don't know if this is automatically set when using third\n// party cluster solutions such as pm2.\nvar clusterWorkerId = __webpack_require__(/*! ./util/cluster-worker-id */ \"./node_modules/shortid/lib/util/cluster-worker-id-browser.js\") || 0;\n\n/**\n * Set the seed.\n * Highly recommended if you don't want people to try to figure out your id schema.\n * exposed as shortid.seed(int)\n * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.\n */\nfunction seed(seedValue) {\n    alphabet.seed(seedValue);\n    return module.exports;\n}\n\n/**\n * Set the cluster worker or machine id\n * exposed as shortid.worker(int)\n * @param workerId worker must be positive integer.  Number less than 16 is recommended.\n * returns shortid module so it can be chained.\n */\nfunction worker(workerId) {\n    clusterWorkerId = workerId;\n    return module.exports;\n}\n\n/**\n *\n * sets new characters to use in the alphabet\n * returns the shuffled alphabet\n */\nfunction characters(newCharacters) {\n    if (newCharacters !== undefined) {\n        alphabet.characters(newCharacters);\n    }\n\n    return alphabet.shuffled();\n}\n\n/**\n * Generate unique id\n * Returns string id\n */\nfunction generate() {\n  return build(clusterWorkerId);\n}\n\n// Export all other functions as properties of the generate function\nmodule.exports = generate;\nmodule.exports.generate = generate;\nmodule.exports.seed = seed;\nmodule.exports.worker = worker;\nmodule.exports.characters = characters;\nmodule.exports.isValid = isValid;\n\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./node_modules/shortid/lib/index.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/is-valid.js":
/*!**********************************************!*\
  !*** ./node_modules/shortid/lib/is-valid.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nvar alphabet = __webpack_require__(/*! ./alphabet */ \"./node_modules/shortid/lib/alphabet.js\");\n\nfunction isShortId(id) {\n    if (!id || typeof id !== 'string' || id.length < 6 ) {\n        return false;\n    }\n\n    var nonAlphabetic = new RegExp('[^' +\n      alphabet.get().replace(/[|\\\\{}()[\\]^$+*?.-]/g, '\\\\$&') +\n    ']');\n    return !nonAlphabetic.test(id);\n}\n\nmodule.exports = isShortId;\n\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./node_modules/shortid/lib/is-valid.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/random/random-byte-browser.js":
/*!****************************************************************!*\
  !*** ./node_modules/shortid/lib/random/random-byte-browser.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto\n\nvar randomByte;\n\nif (!crypto || !crypto.getRandomValues) {\n    randomByte = function(size) {\n        var bytes = [];\n        for (var i = 0; i < size; i++) {\n            bytes.push(Math.floor(Math.random() * 256));\n        }\n        return bytes;\n    };\n} else {\n    randomByte = function(size) {\n        return crypto.getRandomValues(new Uint8Array(size));\n    };\n}\n\nmodule.exports = randomByte;\n\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./node_modules/shortid/lib/random/random-byte-browser.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/random/random-from-seed.js":
/*!*************************************************************!*\
  !*** ./node_modules/shortid/lib/random/random-from-seed.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n// Found this seed-based random generator somewhere\n// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)\n\nvar seed = 1;\n\n/**\n * return a random number based on a seed\n * @param seed\n * @returns {number}\n */\nfunction getNextValue() {\n    seed = (seed * 9301 + 49297) % 233280;\n    return seed/(233280.0);\n}\n\nfunction setSeed(_seed_) {\n    seed = _seed_;\n}\n\nmodule.exports = {\n    nextValue: getNextValue,\n    seed: setSeed\n};\n\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./node_modules/shortid/lib/random/random-from-seed.js?");

/***/ }),

/***/ "./node_modules/shortid/lib/util/cluster-worker-id-browser.js":
/*!********************************************************************!*\
  !*** ./node_modules/shortid/lib/util/cluster-worker-id-browser.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = 0;\n\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./node_modules/shortid/lib/util/cluster-worker-id-browser.js?");

/***/ }),

/***/ "./node_modules/shortid/node_modules/nanoid/format.browser.js":
/*!********************************************************************!*\
  !*** ./node_modules/shortid/node_modules/nanoid/format.browser.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("// This file replaces `format.js` in bundlers like webpack or Rollup,\n// according to `browser` config in `package.json`.\n\nmodule.exports = function (random, alphabet, size) {\n  // We can’t use bytes bigger than the alphabet. To make bytes values closer\n  // to the alphabet, we apply bitmask on them. We look for the closest\n  // `2 ** x - 1` number, which will be bigger than alphabet size. If we have\n  // 30 symbols in the alphabet, we will take 31 (00011111).\n  // We do not use faster Math.clz32, because it is not available in browsers.\n  var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1\n  // Bitmask is not a perfect solution (in our example it will pass 31 bytes,\n  // which is bigger than the alphabet). As a result, we will need more bytes,\n  // than ID size, because we will refuse bytes bigger than the alphabet.\n\n  // Every hardware random generator call is costly,\n  // because we need to wait for entropy collection. This is why often it will\n  // be faster to ask for few extra bytes in advance, to avoid additional calls.\n\n  // Here we calculate how many random bytes should we call in advance.\n  // It depends on ID length, mask / alphabet size and magic number 1.6\n  // (which was selected according benchmarks).\n\n  // -~f => Math.ceil(f) if n is float number\n  // -~i => i + 1 if n is integer number\n  var step = -~(1.6 * mask * size / alphabet.length)\n  var id = ''\n\n  while (true) {\n    var bytes = random(step)\n    // Compact alternative for `for (var i = 0; i < step; i++)`\n    var i = step\n    while (i--) {\n      // If random byte is bigger than alphabet even after bitmask,\n      // we refuse it by `|| ''`.\n      id += alphabet[bytes[i] & mask] || ''\n      // More compact than `id.length + 1 === size`\n      if (id.length === +size) return id\n    }\n  }\n}\n\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./node_modules/shortid/node_modules/nanoid/format.browser.js?");

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected token (1:0)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n> <!DOCTYPE html>\\n| <html lang=\\\"en\\\">\\n| \");\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./src/index.html?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module 'styles.css'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.html */ \"./src/index.html\");\n/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_html__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _js_galleryElem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/galleryElem */ \"./src/js/galleryElem.js\");\n/* harmony import */ var _js_createMarkup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/createMarkup */ \"./src/js/createMarkup.js\");\n/* harmony import */ var _js_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/api-service */ \"./src/js/api-service.js\");\n\r\n\r\n\r\n\r\n\r\n// import refs  from './js/createMarkup';\r\nconst refs = {\r\n    galleryList: document.querySelector('.js-gallery'),\r\n    modal: document.querySelector('.js-lightbox'),\r\n    lightboxImage: document.querySelector('.lightbox__image'),\r\n    modalCloseBtn: document.querySelector('[data-action=\"close-lightbox\"]'),\r\n    modalCloseOverlay: document.querySelector('.lightbox__overlay'),\r\n\r\n}\r\n\r\n\r\nconst galleryMarkup = (0,_js_createMarkup__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_js_galleryElem__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\n// Функция рендеринга разметки \r\n\r\n\r\n\r\n// Вешаем созданную динамическ разметку на существующий єлемент\r\nrefs.galleryList.insertAdjacentHTML('beforeend', galleryMarkup);\r\n// Вешаем слушателя события на список\r\nrefs.galleryList.addEventListener('click', onGalleryListClick)\r\nfunction onGalleryListClick(evt) {\r\n    // Фильтр цели клика\r\n    const isGalleryImageEl = evt.target.classList.contains('gallery__image');\r\n    if (!isGalleryImageEl) {\r\n        return;\r\n    }\r\n    evt.preventDefault();\r\n\r\n    // Вешаем слушателя события на модальное окно\r\n    refs.modal.classList.add('is-open');\r\n    refs.lightboxImage.src = evt.target.dataset.source;\r\n    refs.lightboxImage.alt = evt.target.alt;\r\n    window.addEventListener('keydown', (e) => {\r\n        if (e.key === 'Escape') {\r\n            modalClose();\r\n        }\r\n    });\r\n\r\n}\r\n\r\n// закрытие модального окна кнопкой\r\nrefs.modalCloseOverlay.addEventListener('click', modalClose);\r\nrefs.modalCloseBtn.addEventListener('click', modalClose);\r\nfunction modalClose(evt) {\r\n    refs.modal.classList.remove('is-open');\r\n    refs.lightboxImage.src = \"\";\r\n    refs.lightboxImage.alt = \"\";\r\n    window.removeEventListener('keydown', (e) => {\r\n        if (e.key === 'Escape') {\r\n            modalClose();\r\n        }\r\n    });\r\n}\r\n// if(!refs.modal.classList.contains]('is-open')\r\n\r\n// ){\r\n    \r\n\r\n// }\r\n// console.log('Test');\r\n// import qwe from './js/validate-password';\r\n\r\n// console.log(qwe);\r\n\r\n// import allService from './js/api-service';\r\n\r\n// console.log(allService);\r\n// import {fetchAllUsers,\r\n//     x as value,\r\n//     y as name} from './js/api-service';\r\n// console.log(fetchAllUsers);\r\n// console.log(value);\r\n// console.log(name);\r\n\r\n\r\nconsole.log(_js_api_service__WEBPACK_IMPORTED_MODULE_4__);\r\n\r\n(0,_js_api_service__WEBPACK_IMPORTED_MODULE_4__.addUser)('mango');\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./src/index.js?");

/***/ }),

/***/ "./src/js/api-service.js":
/*!*******************************!*\
  !*** ./src/js/api-service.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchAllUsers\": () => (/* binding */ fetchAllUsers),\n/* harmony export */   \"fetchUserById\": () => (/* binding */ fetchUserById),\n/* harmony export */   \"updateUserById\": () => (/* binding */ updateUserById),\n/* harmony export */   \"addUser\": () => (/* binding */ addUser),\n/* harmony export */   \"x\": () => (/* binding */ x),\n/* harmony export */   \"y\": () => (/* binding */ y)\n/* harmony export */ });\n/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shortid */ \"./node_modules/shortid/index.js\");\n/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shortid__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst fetchAllUsers = () => {\r\n    console.log('fetchAllUsers');\r\n}\r\nconst fetchUserById = () => {\r\n    console.log('fetchUserById');\r\n}\r\nconst updateUserById = id => {\r\n\r\n    console.log('updateUserById');\r\n}\r\nconst addUser = name => {\r\n    const user = {\r\n        id: shortid__WEBPACK_IMPORTED_MODULE_0___default().generate(),\r\n        name,\r\n    };\r\n    console.log(user);\r\n};\r\n// export default {fetchAllUsers, fetchUserById, updateUserById};\r\nconst x = 10;\r\nconst y = 'mango';\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./src/js/api-service.js?");

/***/ }),

/***/ "./src/js/createMarkup.js":
/*!********************************!*\
  !*** ./src/js/createMarkup.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createGalleryCardsMarkup)\n/* harmony export */ });\nfunction createGalleryCardsMarkup (items) {\r\n    return items\r\n        .map(({ preview, original, description }) => {\r\n            return `\r\n    \r\n    <li class=\"gallery__item\">\r\n        <a\r\n          class=\"gallery__link\"\r\n          href=\"${original}\"\r\n        >\r\n          <img\r\n            class=\"gallery__image\"\r\n            src=\"${preview}\"\r\n            data-source=\"${original}\"\r\n            alt=\"${description}\"\r\n          />\r\n        </a>\r\n      </li>\r\n    `;\r\n        }\r\n        )\r\n        .join('');\r\n}\r\n\r\n\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./src/js/createMarkup.js?");

/***/ }),

/***/ "./src/js/galleryElem.js":
/*!*******************************!*\
  !*** ./src/js/galleryElem.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([\r\n    {\r\n        preview:\r\n            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',\r\n        original:\r\n            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',\r\n        description: 'Hokkaido Flower',\r\n    },\r\n    {\r\n        preview:\r\n            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',\r\n        original:\r\n            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',\r\n        description: 'Container Haulage Freight',\r\n    },\r\n    {\r\n        preview:\r\n            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',\r\n        original:\r\n            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',\r\n        description: 'Aerial Beach View',\r\n    },\r\n    {\r\n        preview:\r\n            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',\r\n        original:\r\n            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',\r\n        description: 'Flower Blooms',\r\n    },\r\n    {\r\n        preview:\r\n            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',\r\n        original:\r\n            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',\r\n        description: 'Alpine Mountains',\r\n    },\r\n    {\r\n        preview:\r\n            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',\r\n        original:\r\n            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',\r\n        description: 'Mountain Lake Sailing',\r\n    },\r\n    {\r\n        preview:\r\n            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',\r\n        original:\r\n            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',\r\n        description: 'Alpine Spring Meadows',\r\n    },\r\n    {\r\n        preview:\r\n            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',\r\n        original:\r\n            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',\r\n        description: 'Nature Landscape',\r\n    },\r\n    {\r\n        preview:\r\n            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',\r\n        original:\r\n            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',\r\n        description: 'Lighthouse Coast Sea',\r\n    },\r\n]);\n\n//# sourceURL=webpack://goit-js-hw-08-gallery/./src/js/galleryElem.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;