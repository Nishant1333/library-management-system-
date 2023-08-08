const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // Choose a port number for your backend server

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const books = [
  { id: 1, title: "Book 1", author: "Author 1", quantity: 5 },
  { id: 2, title: "Book 2", author: "Author 2", quantity: 3 },
];

// API endpoint to get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// API endpoint to add a new book
app.post('/api/books', (req, res) => {
  const { title, author, quantity } = req.body;
  const newBook = { id: books.length + 1, title, author, quantity };
  books.push(newBook);
  res.json(newBook);
});

// API endpoint to edit a book
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author, quantity } = req.body;

  const index = books.findIndex(book => book.id === bookId);
  if (index !== -1) {
    books[index].title = title;
    books[index].author = author;
    books[index].quantity = quantity;
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found." });
  }
});

// API endpoint to remove a book
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: "Book removed successfully." });
  } else {
    res.status(404).json({ message: "Book not found." });
  }
});
