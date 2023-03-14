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



const PORT = process.env.PORT || 3001;

//app.get('/test', (request, response) => {

//  response.send('test request received')

//});

// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome to Gotham City Library!');
});

app.get('/books', getBooks);
async function getBooks(request, response, next) {
  try {
    let results = await Books.find({});
    response.status(200).send(results);

  } catch(error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on ${PORT}`));
