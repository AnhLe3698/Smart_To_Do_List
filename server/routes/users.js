/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const searching = require('../helper_functions/searching');
const { addUser } = require('./widgets-api');
const db = require('./widgets-api');


router.post('/login', (req, res) => {
  let email = req.body.email;
  console.log(email);
  db.getUserWithEmail(email).then((bool) => {
    if (bool) {
      console.log(`Valid email ${email}`);
      return res.json(`Valid email ${email}`);
    } else {
      console.log('Invalid email');
      return res.json('Invalid email');
    }
  }).catch(e => res.send(e));
});

router.post('/register', (req, res) => {
  let user = {};
  user['email'] = req.body.email;
  user['lastName'] = req.body.lastName;
  user['firstName']= req.body.firstName;
  db.getUserWithEmail(user['email']).then((bool) => {
    if (bool) {
      console.log('Duplicate email');
      return res.json('Duplicate email');
    } else {
      console.log(user);
      addUser(user).then((result) => {
        console.log(`The following user was added ${result}`);
      });
      return res.json(`The following user was added ${result}`);
    }
  }).catch(e => res.send(e));
})


router.post('/delete/:itemid', (req, res)=>{
  let itemId = req.params.itemid;
  console.log(itemId);
  db.removeItem(itemId)
  .then(()=>res.send('deleted succusseflyy'))
  .catch(e => res.send(e))
});


router.post('/insert', (req, res)=>{
  let item = req.body;
  console.log(req.body);
  db.addItem(item)
  .then(()=>res.send('added succusseflyy'))
  .catch(e => res.send(e))
});


// router.post('/', (req, res) => {
//   const user = req.body;
//   user.password = bcrypt.hashSync(user.password, 12);
//   database.addUser(user)
//   .then(user => {
//     if (!user) {
//       res.send({error: "error"});
//       return;
//     }
//     req.session.userId = user.id;
//     res.send("🤗");
//   })
//   .catch(e => res.send(e));
// });

// router.get('/bob', (req, res) => {
//   let s = req.body['name'];
//   let a = req.body['fridge'];

//    //Movies
//   // Weight, multiple searches
//   const settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://imdb8.p.rapidapi.com/auto-complete?q=zoomer%20time",
//     "method": "GET",
//     "headers": {
//         "X-RapidAPI-Key": "5c80e7d1e9msh4513bc486b71eb9p148650jsn1871c62ac280",
//         "X-RapidAPI-Host": "imdb8.p.rapidapi.com"
//     }
//   };

//   request(settings.url, (e, body, res) => {
//     if (e) {

//     }
//     return body.qid

//   }).then(function (type1) {
//     console.log(type);
//     request(settings.url, (e, body, res) => {
//       if (e) {

//       }
//       return body.qid
//     }).then(function (type2) {
//       console.log(type);
//       request(settings.url, (e, body, res) => {
//         if (e) {

//         }
//         return body.qid
//       }).then(function (type) {
//         console.log(type);
//         request(settings.url, (e, body, res) => {
//           if (e) {

//           }
//           return body.qid
//         }).then(function (type4) {
//           console.log(type);
//           return searching([type1, type2, type3, type4);
//         });
//       });
//     });
//   });




//   console.log(a+s);
//   res.render('login'); // ejs
// });

module.exports = router;
