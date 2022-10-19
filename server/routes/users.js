//////////////////////////////////////
///////////User Routes///////////////
////////////////////////////////////

const express = require('express');
const router = express.Router();
const searching = require('../helper_functions/searching');
const { addUser, getUserName } = require('./dbQueries');
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

      db.getUserName(email).then((name) => {
        res.cookie('name', name);
        db.grabInitialList(email).then((data) => {

          return res.json(data);
        }).catch(e => res.send(e));
      })

    } else {
      // Failed Login
      console.log('Invalid email');
      return res.json('Invalid email');
    }
  }).catch(e => res.send(e));
});

router.get('/logout', (req, res) => {
  res.clearCookie('email');
  res.clearCookie('name');
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
      res.set('Content-Type', 'text/html');
      res.send(Buffer.from(`
      <div class="alert alert-warning center-content" role="alert">
        Email already exists!
      </div>`));
      return res.json('Duplicate email');
    } else {
      // Successful Register
      res.cookie('email', user.email);
      res.cookie('name', user.firstName);
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
    .then(() => res.send(Buffer.from()))
    .catch(e => res.send(e))
});


router.post('/add', (req, res) => {
  let item = req.body;
  console.log('item before',item);
  let email = req.cookies['email'];
  db.ifItemExists(item.name, email).then((bool) => {
    if(bool) {
      // If it exists do not add the item
      db.ifItemExistsButFalse(item.name, email).then((bool) => {
        if(bool) {
          db.updataItemToTrue(item.name, email).then((result) => {
            if (result) {
              item['category'] = result.category;
              item['name'] = result.name;
              res.json(item);
            } else {
              res.json('Sorry item already exists');
            }
          }).catch(e => res.send(e));
        } else {
          res.json('Sorry item already exists');
        }
      })

    } else {
      // If it does not exist, add the item
      db.getUserID(email).then((result) => {
        item['userid'] = result;
        db.grabItemCategory(item).then((row)=>{
          if (row) {
            item['category'] = row.category;
            item['name'] = row.name;
            db.addItem(item).then(() => res.json(item)).catch(e => res.send(e));
          } else {
            item['category'] = 'sort';
            db.addItemToDatabase(item).then(() => {
              db.addItem(item).then(() => res.json(item)).catch(e => res.send(e));
            }).catch(e => res.send(e));
          }
      }).catch(e => res.send(e))
    }).catch(e => res.send(e))
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
