/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router = express.Router();
const searching = require('../helper_functions/searching');
const { addUser } = require('./dbQueries');
const db = require('./dbQueries');



router.post('/login', (req, res) => {
  let email = req.body.email;
  console.log(email);
  db.getUserWithEmail(email).then((bool) => {
    //console.log(bool);
    if (bool) {
      // Successful Login
      console.log(`Valid email ${email}`);
      res.cookie('email', email);
      db.grabInitialList(email).then((data) => {
        console.log(data);
        return res.json(data);
      }).catch(e => res.send(e));
    } else {
      // Failed Login
      console.log('Invalid email');
      return res.json('Invalid email');
    }
  }).catch(e => res.send(e));
});

router.get('/logout', (req, res) => {
  res.clearCookie('email');
  return res.json('nice');
});

router.post('/register', (req, res) => {
  let user = {};
  user['email'] = req.body.email;
  user['lastName'] = req.body.lastName;
  user['firstName'] = req.body.firstName;
  db.getUserWithEmail(user['email']).then((bool) => {
    if (bool) {
      // Failed register attempt
      console.log('Duplicate email');
      return res.json('Duplicate email');
    } else {
      // Successful Register
      res.cookie('email', user.email);
      //console.log(user);
      addUser(user).then((result) => {
        //console.log(result);
      });
      return res.json(`The following user was added ${result}`);
    }
  }).catch(e => res.send(e));
});


router.post('/delete/:itemName', (req, res) => {
  let itemName = req.params.itemName;
  db.removeItem(itemName, req.cookies['email'])
    .then(() => res.send('deleted succusseflyy'))
    .catch(e => res.send(e))
});


// Searching function needs to be invoked in this path
// { 'name': name, 'category': category } remove category in listener and object
// Searching funciton will add category
router.post('/insert', (req, res) => {
  let item = req.body;
  console.log(item);
  db.ifItemExists(item.name, req.cookies['email']).then((bool) => {
    //console.log(bool);
    if(bool) {
      // If it exists do not add the item
      res.json('Sorry item already exists');
    } else {
      // If it does not exist, add the item
      db.getUserID(req.cookies['email']).then((result) => {
        item['userid'] = result;
        db.addItem(item)
        .then(() => res.json(item))
        .catch(e => res.send(e))
      }).catch(e => res.send(e));
    }
  })


});


router.post('/add', (req, res) => {
  let item = req.body;
  console.log('item before',item);
  db.ifItemExists(item.name, req.cookies['email']).then((bool) => {
    //console.log(bool);
    if(bool) {
      // If it exists do not add the item
      res.json('Sorry item already exists');
    } else {
      // If it does not exist, add the item
      db.getUserID(req.cookies['email']).then((result) => {
        item['userid'] = result;
        db.categorizeItem(item).then((category)=>{
          item['category'] = category;
          db.addItem(item)
        .then(() => res.json(item))
        .catch(e => res.send(e))
      }).catch(e => res.send(e))
        })
    }
  })


});


router.get('/', (req, res) => {
  let email = req.cookies['email'];
  if (email && email.length !== 0) {
    db.grabInitialList(email).then((data) => {
      if(data.length !== 0) {
        //console.log(data);
        res.json(data);
      } else {
        res.json('Not logged in');
      }
    }).catch(e => res.send(e))
  } else {
    res.json('Not logged in');
  }

})

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
