//////////////////////////////////////
///////////User Routes///////////////
////////////////////////////////////

const express = require('express');
const router = express.Router();
const searching = require('../helper_functions/searching');
const { addUser, getUserName, recategorizeItem } = require('./dbQueries');
const db = require('./dbQueries');

// The login form is handled on the front end
router.post('/login', (req, res) => {
  let email = req.body.email; // Grab email from request header
  db.getUserWithEmail(email).then((bool) => {

    if (bool) {
      // Successful Login

      // Set email cookie
      res.cookie('email', email);
      db.getUserName(email).then((name) => {
        // Sets new cookie for username based on their email
        res.cookie('name', name);
        // Grabs the initial list
        db.grabInitialList(email).then((data) => {

          return res.json(data);
        }).catch(e => res.send(e));
      })

    } else {
      // Failed Login
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
      return res.send(Buffer.from(`
      <div class="alert alert-warning center-content" role="alert">
        Email already exists!
      </div>`));
      // return res.json('Duplicate email'); Deprecated
    } else {
      // Successful Register
      res.cookie('email', user.email);
      res.cookie('name', user.firstName);
      addUser(user).then((result) => {
        return res.json(`The following user was added ${result}`);
      });
      ;
    }
  }).catch(e => res.send(e));
});


router.post('/delete/:itemName', (req, res) => {
  let itemName = req.params.itemName;
  db.removeItem(itemName, req.cookies['email'])
    .then(() => res.send(Buffer.from(
      `<div class="alert alert-success center-content" role="alert">Deleted!</div>
      <script>
        setTimeout(function () {
        $('.alert').fadeOut(2000)}, 1000);
      </script>
    `
    )))
    .catch(e => res.send(e))
});

////////////////////////////////////////////////
// MAIN PATH FEATURE PATH ADD ITEMS TO LIST ///
///////////////////////////////////////////////
router.post('/add', (req, res) => {
  let item = req.body;
  let email = req.cookies['email'];
  db.ifItemExists(item.name, email).then((bool) => {
    if(bool) {
      // If it exists do not add the item
      db.ifItemExistsButFalse(item.name, email).then((bool) => {
        if(bool) {
          db.updataItemToTrue(item.name, email).then((result) => {
            console.log(result)
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

router.post('/profile', (req, res) => {
  let email = req.body.email;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  console.log(email, firstName, lastName);
  console.log(req.cookies['email']);
  // edits the user based on information given
  db.editUser(email, firstName, lastName, req.cookies['email']).then((result) => {
    
    res.clearCookie('email');
    res.clearCookie('name');
    res.cookie('email', email);
    res.cookie('name', firstName);
    res.json(result);
  }).catch(e => res.send(e));
});


// This will load our initial load on every page refresh
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

router.post('/recat', (req, res) => {
  let item = req.body;
  recategorizeItem(item).then((result) => {
    recategorizeDB (item).then((result1) => {
      // Returns array [itemName, category]
      return res.json(result1);
    })
  }).catch(e => res.send(e));
});

module.exports = router;
