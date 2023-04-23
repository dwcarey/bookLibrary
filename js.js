// book object constructor used with new(Book) to create object with properties

const myLibrary = [];

function BookTitle(title) {
  this.title = title;
}

BookTitle.prototype.sayTitle = function () {
  console.log(`The title is ${this.title}`);
};

function Book(title, author, pages, read, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = index;
}

Book.prototype = Object.create(BookTitle.prototype);
Book.prototype.constructor = Book;

Book.prototype.info = function () {
  console.log(this.title, this.author, this.pages, this.read, this.index);
};

function addNewBook(title, author, pages, read, index) {
  const book = new Book(title, author, pages, read, index);
  myLibrary.push(book);
  console.log(myLibrary);
}

const form = document.getElementById('bookForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const title = formData.get('bookTitle');
  const author = formData.get('bookAuthor');
  const pages = formData.get('bookPages');
  const read = formData.get('bookRead');
  const index = myLibrary.length;
  addNewBook(title, author, pages, read, index);
  addToList(myLibrary[index]);
  form.reset();
  closeForm();
});

const cardHolder = document.querySelector('.cardHolder');

// this aint right
function addToList(book) {
  const bookInfo = `<div>Title: ${book.title}<br>Author: ${book.author}<br>Pages: ${book.pages}<br>Read: ${book.read}<br>Index: ${book.index}<br><button id="deleteButton-${book.index}">Delete</Button></div>`;
  cardHolder.insertAdjacentHTML('beforeend', bookInfo);
}

cardHolder.addEventListener('click', (e) => {
  if (e.target && e.target.id.startsWith('deleteButton-')) {
    const index = e.target.id.split('-')[1];
    console.log(`Delete button ${index} clicked`);

    deleteButton(index);
  }
});

function deleteButton(index) {
  myLibrary.splice(index, 1);
  cardHolder.replaceChildren();
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].index = i;
    const bookInfo = `<div>Title: ${myLibrary[i].title}<br>Author: ${myLibrary[i].author}<br>Pages: ${myLibrary[i].pages}<br>Read: ${myLibrary[i].read}<br>Index: ${myLibrary[i].index}<br><button id="deleteButton-${myLibrary[i].index}">Delete</Button></div>`;
    cardHolder.insertAdjacentHTML('beforeend', bookInfo);
  }
  const deletedButton = document.getElementById(`deleteButton-${index}`);
  deletedButton.removeAttribute('onclick');
}

const overlay = document.createElement('div');
overlay.classList.add('overlay');

function openForm() {
  document.getElementById('formPopup').style.display = 'flex';
  document.body.appendChild(overlay);
}

function closeForm() {
  document.getElementById('formPopup').style.display = 'none';
  document.body.removeChild(overlay);
}

const closeButton = document.getElementById('closeButton');

closeButton.addEventListener('click', () => {
  closeForm();
});
