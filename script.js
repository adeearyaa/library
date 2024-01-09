let myLibrary = [];
const cardContainer = document.querySelector(".main-books-container");
let bookIdCounter = 0; // Counter for unique book IDs

function Book(title, author, pages, readBefore) {
  this.id = bookIdCounter++; // Assign a unique ID
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readBefore = readBefore;
}

function displayBooks() {
  // Clear existing content
  cardContainer.innerHTML = '';

  // Create and display new content
  myLibrary.forEach(book => {
    const div = document.createElement("div");
    div.classList.add("books");
    div.innerHTML = `<h2>${book.title}</h3><div>${book.author}</div>
      <div>${book.pages}</div> 
      <button id="${book.id}" class="book-remove">Remove book</button>`;
    cardContainer.appendChild(div);
  });

  // Add event listeners (event delegation)
  cardContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('book-remove')) {
      removeBook(event.target.id);
    }
  });
}

function removeBook(bookID) {
  myLibrary = myLibrary.filter(book => book.id != bookID);
  displayBooks();
}

document.querySelector('.book-button').addEventListener('click', () => {
  document.querySelector('#addBookDialog').showModal();
});

document.querySelector('#bookForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const bookName = document.querySelector('#bookName').value;
  const bookAuthor = document.querySelector('#bookAuthor').value;
  const bookPages = document.querySelector('#bookPages').value;

  const newBook = new Book(bookName, bookAuthor, bookPages, 'Not Read'); // Adjust according to your Book constructor
  myLibrary.push(newBook);
  displayBooks();

  document.querySelector('#addBookDialog').close();
});

document.querySelector("#cancel-input").addEventListener("click", () => {
  document.querySelector('#addBookDialog').close();
})

// Initial books
const bookOne = new Book("Harry Potter", "JK Rowling", "300", "yes");
const bookTwo = new Book("Harry Potty", "JK Rowing", "300", "no");
myLibrary.push(bookOne, bookTwo);
displayBooks();