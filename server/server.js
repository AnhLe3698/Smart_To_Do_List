// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('.././lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookiesState = require('cookie-parser');

// Setting port and creating an instant of a server
const PORT = process.env.PORT || 8080;
const app = express();

// Get and Post request statistics
app.use(morgan('dev'));
app.use(cookiesState());
app.use(express.urlencoded({ extended: true }));
// Sass to css constructor
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '.././styles',
    destination: __dirname + '.././public/styles',
    isSass: false, // false => scss, true => sass
  })
);

// Express will serve Frontend Files from /public folder
app.use(express.static('public'));

// Our routes are extensions from /users path
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// Listener
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

