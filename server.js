'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Books = require('./selection/books.js');

// bring in mongoose
const mongoose = require('mongoose');

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

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
