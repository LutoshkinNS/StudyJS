'use strict'

const books = document.querySelector('.books');
const booksItem = document.querySelectorAll('.book');
const body = document.querySelector('body');
const adv = document.querySelector('.adv');
const titleBook = booksItem[4].querySelector('a')
const listItemsSecondBook = booksItem[0].querySelectorAll('li');
const listItemsFifthBook = booksItem[5].querySelectorAll('li');
const listItemsSixthBook = booksItem[2].querySelectorAll('li');


booksItem[1].after(booksItem[0]);
booksItem[4].after(booksItem[3]);
books.append(booksItem[2]);

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

adv.remove();

titleBook.textContent = 'Книга 3. this и Прототипы Объектов';

listItemsSecondBook[3].after(listItemsSecondBook[6]);
listItemsSecondBook[9].after(listItemsSecondBook[2]);
listItemsSecondBook[6].after(listItemsSecondBook[8]);

listItemsFifthBook[1].after(listItemsFifthBook[9]);
listItemsFifthBook[4].after(listItemsFifthBook[2]);
listItemsFifthBook[7].after(listItemsFifthBook[5]);

listItemsSixthBook[8].insertAdjacentHTML("afterend", '<li>Глава 8: За пределами ES6</li>');