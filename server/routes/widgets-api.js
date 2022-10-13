/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../../database/connection');

//'/api/widgets'
router.get('/', (req, res) => {
  const query = `SELECT * FROM widgets`;
  console.log(query);
  db.query(query)
    .then(data => {
      const widgets = data.rows;
      res.json({ widgets });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// module.exports = {
//   getUserWithEmail: (email) => {
//     return pool
//       .query(`SELECT * FROM users
//       WHERE email = $1`, [`${email}`])
//       .then((result) => {
//         if (result) {
//           console.log(result.rows[0]);
//           return result.rows[0];
//         } else {
//           return null;
//         }

//       })
//       .catch((err) => {
//         console.log(err.message);
//       })
//   },

module.exports = router;
