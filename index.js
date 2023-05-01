const myLibrary = [];

class Book {
  constructor(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = parseInt(pages, 10);
    this.read = read ? 'read' : 'unread';
    this.index = index;
  }

  static addToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read, myLibrary.length);
    myLibrary.push(book);
  }

  bookInfo() {
    return `The book is called ${this.title} by ${this.author}. It has ${this.pages} pages and its read status is ${this.read}, indexed in this library as ${this.index}.`;
  }
}

Book.addToLibrary('Big old book of books number 1', 'writer of books', '9999', true, myLibrary.length);
Book.addToLibrary('Big old book of books number 2', 'writer of books', '9999', true, myLibrary.length);
Book.addToLibrary('Big old book of books number 3', 'writer of books', '999', false, myLibrary.length);
Book.addToLibrary('Big old book of books number 4', 'writer of books', '99', true, myLibrary.length);
Book.addToLibrary('Big old book of books number 5', 'writer of books', '9', true, myLibrary.length);
Book.addToLibrary('Big old book of books number 6', 'writer of books', '0', true, myLibrary.length);

const displayController = (() => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  const form = document.getElementById('bookForm');
  const cardHolder = document.querySelector('.cardHolder');
  const popupButton = document.getElementById('popupButton');
  const closeButton = document.getElementById('closeButton');

  function openForm() {
    document.getElementById('formPopup').style.display = 'flex';
    document.body.appendChild(overlay);
  }
  popupButton.addEventListener('click', () => {
    openForm();
  });

  function closeForm() {
    document.getElementById('formPopup').style.display = 'none';
    document.body.removeChild(overlay);
  }
  closeButton.addEventListener('click', () => {
    closeForm();
  });

  function createCard(book) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read}</p>
      <Button id="deleteButton-${book.index}">Delete</Button>
      <Button id="editButton-${book.index}">Mark as Read/Unread</Button>
    `;
    return card;
  }
  function displayLibrary() {
    cardHolder.innerHTML = '';
    myLibrary.forEach((book) => {
      const card = createCard(book);
      cardHolder.appendChild(card);
    });
  }
  // After adding the new book to the library
  displayLibrary();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const pages = document.getElementById('bookPages').value;
    const read = document.getElementById('bookRead').checked;
    const index = myLibrary.length;

    Book.addToLibrary(title, author, pages, read, index);
    form.reset();
    closeForm();
    displayLibrary();
  });

  function deleteButton(index) {
    const bookIndex = parseInt(index, 10);
    myLibrary.splice(bookIndex, 1);
    for (let i = bookIndex; i < myLibrary.length; i += 1) {
      myLibrary[i].index = i;
    }
    displayLibrary();
  }
  cardHolder.addEventListener('click', (e) => {
    if (e.target && e.target.id.startsWith('deleteButton-')) {
      const index = e.target.id.split('-')[1];
      deleteButton(index);
    }
  });

  function readButton(index) {
    const editEntry = myLibrary.splice(index, 1)[0];
    if (editEntry.read === true || editEntry.read === 'read') {
      editEntry.read = 'unread';
    } else {
      editEntry.read = 'read';
    }
    myLibrary.splice(index, 0, editEntry);
    displayLibrary();
  }
  cardHolder.addEventListener('click', (e) => {
    if (e.target && e.target.id.startsWith('editButton-')) {
      const index = e.target.id.split('-')[1];
      readButton(index);
    }
  });
})();
