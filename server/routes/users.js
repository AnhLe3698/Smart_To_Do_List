/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const searching = require('../helper_functions/searching');

router.get('/bob', (req, res) => {
  let s = req.body['name'];
  let a = req.body['fridge'];

   //Movies
  // Weight, multiple searches
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://imdb8.p.rapidapi.com/auto-complete?q=zoomer%20time",
    "method": "GET",
    "headers": {
        "X-RapidAPI-Key": "5c80e7d1e9msh4513bc486b71eb9p148650jsn1871c62ac280",
        "X-RapidAPI-Host": "imdb8.p.rapidapi.com"
    }
  };

  request(settings.url, (e, body, res) => {
    if (e) {

    }
    return body.qid

  }).then(function (type1) {
    console.log(type);
    request(settings.url, (e, body, res) => {
      if (e) {

      }
      return body.qid
    }).then(function (type2) {
      console.log(type);
      request(settings.url, (e, body, res) => {
        if (e) {

        }
        return body.qid
      }).then(function (type) {
        console.log(type);
        request(settings.url, (e, body, res) => {
          if (e) {

          }
          return body.qid
        }).then(function (type4) {
          console.log(type);
          return searching([type1, type2, type3, type4);
        });
      });
    });
  });




  console.log(a+s);
  res.render('login'); // ejs
});

module.exports = router;
