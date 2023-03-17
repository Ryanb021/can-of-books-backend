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
  image_url: 'https://w0.peakpx.com/wallpaper/113/52/HD-wallpaper-the-dark-knight-rises.jpg',
  description: 'Justice and Vengeance! Hero that we deserve!',
  status: 'true'
});

console.log('Batman is The Dark Knight!');

await Books.create({
  title: 'S is for Hope',
  image_url: 'https://i0.wp.com/batman-news.com/wp-content/uploads/2013/05/Superman-Man-of-Steel-Logo-Imgur.jpeg?w=1920&quality=80&strip=info&ssl=1',
  description: 'A God among men.',
  status: 'true'
});

console.log('Superman stands for Hope.');

await Books.create({
  title: 'Killing Joke',
  image_url: 'https://i.kym-cdn.com/entries/icons/original/000/003/189/Why_So_Serious_Banner.jpg',
  description: 'Joker causing death and chaos!',
  status: 'true'
});

console.log('Why so serious?');
mongoose.disconnect();
}

seed();
