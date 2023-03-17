'use strict'

const { urlencoded } = require('express');
/*
let aBook = new Schema ({
  title: 'The Dark Knight',
  description: 'Justice and Vengeance! Hero that we deserve!',
  status: 'Out and about breaking bones and spirit!'
});


*/
const mongoose = require('mongoose');

const { Schema } = mongoose;
// this is Schema, rules allowed in database
const booksSchema = new Schema({
  title: {type: String, required: true},
  //img: {type: String, format: data-url},
  description: {type: String, required: true},
  status: {type: Boolean, required: true},
});

// define selections, this is the functionality of how to interact w/database
const BooksSelections = mongoose.model('Books', booksSchema);
// the server.js will have access to the functionality of our database
module.exports = BooksSelections;
