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
        if(result['rows'].length !== 0) {
          return true;
        } else {
          return false;
        }
      } else {
        // ADD CODE
      }

    })
    .catch((err) => {
      console.log(err.message);
    });
  },

  // This query should add an extra item to items table
  addEntry: (toDoItem) => {
    return pool.query(`ADD SQL QUERY`, [`${toDoItem}`])
    .then((result) => {
      if (result) {
        // Add CODE
      } else {
        // ADD CODE
      }

    })
    .catch((err) => {
      console.log(err.message);
    });
  },

  // This query should logically change the status of an active
  // item to an inactive item
  logicRemoveItem: (toDoItem) => {
    return pool.query(`ADD SQL QUERY`, [`${toDoItem}`])
    .then((result) => {
      if (result) {
        // Add CODE
      } else {
        // ADD CODE
      }

    })
    .catch((err) => {
      console.log(err.message);
    });
  },

  //  This should join the users and items table and grab all
  // items specific to user
  grabInitialList: (email) => {
    return pool.query(`ADD SQL QUERY`, [`${email}`])
    .then((result) => {
      if (result) {
        // Add CODE
      } else {
        // ADD CODE
      }

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
