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

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '.././styles',
    destination: __dirname + '.././public/styles',
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
// app.use('/api/widgets', widgetApiRoutes);


// <form class="submit-coolest">
// <text name = "cold"> Rob </textfield>
// <text name = "fridge"> Rob </textfield>
// <button type="submit" class="submit-button"></button>
//</form>

// $('.cool').on('click', function() {
  // let s = somefuncForms.params
  // let params = {'name': s['name'], 'fridge': s['fridge]}
// $('.cool').submit(/path, params, (data) => {
//})
// })

app.use('/users', usersRoutes); // ===> /bob  in users.js router object

app.get('/bob', (req, res) => {

});
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// We do not need this command since we are making single page app
// app.get('/', (req, res) => {
//   res.render('index');
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// it checkout main
// git pull orgin main
// git checkout -b name-of-branch

// feat/api-connection
// refactor/name0of-refactor
// fix/name-of-fix
