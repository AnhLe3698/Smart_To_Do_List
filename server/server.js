// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('.././lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookiesState = require('cookie-parser');


const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(cookiesState());
app.use(express.urlencoded({ extended: true }));
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


const usersRoutes = require('./routes/users');

app.use('/users', usersRoutes);




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

