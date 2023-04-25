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
}
const overlay = document.createElement('div');
overlay.classList.add('overlay');

// hide and show differeetn submit/edit buttons in this method based on which button was clicked?
function openForm() {
  document.getElementById('formPopup').style.display = 'flex';
  document.body.appendChild(overlay);
}

function closeForm() {
  document.getElementById('formPopup').style.display = 'none';
  document.body.removeChild(overlay);
}

const form = document.getElementById('bookForm');
const cardHolder = document.querySelector('.cardHolder');
const popupButton = document.getElementById('popupButton');

popupButton.addEventListener('click', () => {
  openForm();
});

function addToList(book) {
  const bookInfo = `<div>
  Title: ${book.title}
  <br>Author: ${book.author}
  <br>Pages: ${book.pages}
  <br>Read: ${book.read}
  <br>Index: ${book.index}
  <br><Button id="deleteButton-${book.index}">Delete</Button>
  <Button id="editButton-${book.index}">Mark as Read/Unread</Button>
  </div>`;
  cardHolder.insertAdjacentHTML('beforeend', bookInfo);
}

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

function deleteButton(index) {
  myLibrary.splice(index, 1);
  cardHolder.replaceChildren();
  for (let i = 0; i < myLibrary.length; i += 1) {
    myLibrary[i].index = i;
    const bookInfo = `<div>
    Title: ${myLibrary[i].title}
    <br>Author: ${myLibrary[i].author}
    <br>Pages: ${myLibrary[i].pages}
    <br>Read: ${myLibrary[i].read}
    <br>Index: ${myLibrary[i].index}
    <br><Button id="deleteButton-${myLibrary[i].index}">Delete</Button>
    <Button id="editButton-${myLibrary[i].index}">Mark as Read/Unread</Button>
    </div>`;

    cardHolder.insertAdjacentHTML('beforeend', bookInfo);
  }
}

cardHolder.addEventListener('click', (e) => {
  if (e.target && e.target.id.startsWith('deleteButton-')) {
    const index = e.target.id.split('-')[1];
    deleteButton(index);
  }
});

function editButtonClicked(index) {
  const editEntry = myLibrary.splice(index, 1)[0];
  if (editEntry.read === 'YES') {
    editEntry.read = 'NO';
  } else {
    editEntry.read = 'YES';
  }
  myLibrary.splice(index, 0, editEntry);

  cardHolder.replaceChildren();
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].index = i;
    const bookInfo = `<div>
    Title: ${myLibrary[i].title}
    <br>Author: ${myLibrary[i].author}
    <br>Pages: ${myLibrary[i].pages}
    <br>Read: ${myLibrary[i].read}
    <br>Index: ${myLibrary[i].index}
    <br><Button id="deleteButton-${myLibrary[i].index}">Delete</Button>
    <Button id="editButton-${myLibrary[i].index}">Mark as Read/Unread</Button>
    </div>`;

    cardHolder.insertAdjacentHTML('beforeend', bookInfo);
  }
}

cardHolder.addEventListener('click', (e) => {
  if (e.target && e.target.id.startsWith('editButton-')) {
    const index = e.target.id.split('-')[1];
    editButtonClicked(index);
  }
});

const closeButton = document.getElementById('closeButton');

closeButton.addEventListener('click', () => {
  closeForm();
});
