'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Books = require('./selection/books.js');

// bring in mongoose
const mongoose = require('mongoose');
const { response } = require('express');

// add validation to confirm we are wire up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// connect mongoose to MongoDB
mongoose.connect(process.env.DB_URL);

// USE implement express
const app = express();

// middleware
app.use(cors());
// we must have this to receive JSON data from a request
app.use(express.json());



const PORT = process.env.PORT || 3001;

//app.get('/test', (request, response) => {

//  response.send('test request received')

//});

// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome to Gotham City Library!');
});

app.get('/books', getBooks);
// HANDLER
app.post('/books', postBooks);
// : is pass parameter id is variable
app.delete('/books/:id', deleteBooks);
app.put('/books/:id', putBooks);

async function getBooks(request, response, next) {
  try {
    let results = await Books.find({});
    response.status(200).send(results);

  } catch(error) {
    next(error);
  }
}
// Express
async function postBooks(request, response, next) {
  console.log(request.body);
  try{

  // we want to add books to our database, Books is model from Mongoose
  let createdBooks = await Books.create(request.body)
  response.status(200).send(createdBooks);
  } catch(error) {
    next(error);
  }
}

// Function  for delete Handler
async function deleteBooks(request, response, next) {
  try {
    let id = request.params.id;
    // do not expect anything to be returned by findByIdAndDelete
    await Books.findByIdAndDelete(id);
    response.status(200).send('Confirmed Deletion!');
  } catch(error) {
    next(error);
  }
}

async function putBooks(request, response, next) {
  try {
    let id = request.params.id;
    let updatedBooks = request.body;

    // findByIdAndUpdate method takes in 3 arguments:
    // 1st is the id, 2nd is updated data object, 3rd is options object
    let updatedBooksFromDatabase = await Books.findByIdAndUpdate(id, updatedBooks, { new: true, overwrite: true });
    response.status(200).send(updatedBooksFromDatabase);

  } catch(error) {
    next(error);
  }
}
// * is WildCard!
app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on ${PORT}`));
