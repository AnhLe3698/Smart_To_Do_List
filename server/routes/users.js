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

module.exports = router;
