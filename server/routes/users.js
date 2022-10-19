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
    .then(() => res.send(Buffer.from(`
      <script>
      let deleteMessage =\`<div class="alert alert-success center-content" role="alert">
        Deleted!
      </div>\`;

      let alert = $(deleteMessage);
      $('main').prepend(alert);
      setTimeout(function () {
        alert.fadeOut(3000);
      }, 2000);
      </script>
    `)))
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
  let email = req.cookies['email'];
  db.ifItemExists(item.name, email).then((bool) => {
    //console.log(bool);
    if(bool) {
      // If it exists do not add the item
      db.ifItemExistsButFalse(item.name, email).then((bool) => {
        if(bool) {
          db.updataItemToTrue(item.name, email).then((result) => {
            if (result) {
              item['category'] = result.category;
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
        db.grabItemCategory(item).then((category)=>{
          if (category) {
            item['category'] = category;
            db.addItem(item).then(() => res.json(item)).catch(e => res.send(e));
          } else {
            item['category'] = 'sort';
            db.addItemToDatabase(item).then(() => res.json(item)).catch(e => res.send(e));
          }

      }).catch(e => res.send(e))
    }).catch(e => res.send(e))
    }
  })


});

router.post('/profile', (req, res) => {
  let email = req.body.email;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  console.log(email, firstName, lastName);
  // edits the user based on information given
  db.editUser(email, firstName, lastName, req.cookie['email']).then((result) => {
    res.clearCookie('email');
    res.clearCookie('name');
    res.cookie('email', email);
    res.cookie('name', firstName);
    res.json(result);
  }).catch(e => res.send(e));
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
