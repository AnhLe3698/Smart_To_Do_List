/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */



const pool = require('../../database/connection');

module.exports = {
  // This should verify if user is registered by returning true
  getUserWithEmail: (email) => {
    return pool.query(`SELECT * FROM users
    WHERE email = $1`, [`${email}`])
      .then((result) => {
        if (result) {
          if (result['rows'].length !== 0) {
            // Returns true if user email is in database
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }

      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  getUserID: (email) => {
    return pool.query(`SELECT * FROM users
    WHERE email = $1`, [`${email}`])
      .then((result) => {
        if (result) {
          if (result['rows'].length !== 0) {
            // Returns true if user email is in database
            return result['rows'][0].id;
          } else {
            return null;
          }
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  addUser: (user) => {

    const values = [user.firstName, user.lastName, user.email];

    let queryString = `INSERT INTO users
    (first_name, last_name, email)
    VALUES ($1, $2, $3)
    RETURNING* ;
    `;

    return pool.query(queryString, values)
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  // This query should add an extra item to items table
  addItem: (item) => { //maybe return item as object ??? and maybe check if the user entered an empty object

    const values = [item.userid, item.name, item.category];

    let queryString = `INSERT INTO items
    (userid, name, category, is_active)
    VALUES ($1, $2, $3, TRUE)
    RETURNING* ;
    `;

    return pool.query(queryString, values)
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  // This query should logically change the status of an active
  // item to an inactive item
  removeItem: (itemid) => {

    const values = [itemid];

    let queryString = `UPDATE items
    SET is_active = FALSE
    WHERE id = $1
    RETURNING* ;
    `;

    return pool.query(queryString, values)
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
      });

  },

  //  This should join the users and items table and grab all
  // items specific to user
  grabInitialList: (useremail) => {
    const values = [useremail];

    let queryString = `SELECT items. *
    FROM items
    JOIN users ON users.id = items.userid
    WHERE users.email = $1 AND is_active = TRUE;
    `;

    return pool.query(queryString, values)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

}

// Commented out since we are no longer using router
// const express = require('express');
// Commented out since we are no longer using router
// const router  = express.Router();

//'/api/widgets'
// router.get('/', (req, res) => {
//   const query = `SELECT * FROM widgets`;
//   console.log(query);
//   pool.query(query)
//     .then(data => {
//       const widgets = data.rows;
//       res.json({ widgets });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// Commented out since we are no longer using router
// module.exports = router;
