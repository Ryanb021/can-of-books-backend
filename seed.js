'use strict'

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Books = require('./selection/books.js');

async function seed() {
  // add books to our database
  // follow same structure of Books Schema

  /*
let aBook = new Schema ({
  title: 'The Dark Knight',
  description: 'Justice and Vengeance! Hero that we deserve!',
  status: 'Out and about breaking bones and spirit!'
});


*/
await Books.create({
  title: 'The Dark Knight',
  description: 'Justice and Vengeance! Hero that we deserve!',
  status: 'Out and about breaking bones and spirit!'
});

console.log('Batman is The Dark Knight!');
mongoose.disconnect();
}

seed();
