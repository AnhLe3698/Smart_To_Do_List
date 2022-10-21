///////////////////////////////////////////
///////////Database Queries///////////////
//////////////////////////////////////////

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
            console.log(result['rows'][0].id);
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

  // Edit user profile
  editUser: (firstName, lastName, email) => {
    const values = [firstName, lastName, email];

    let queryString = `UPDATE users
    SET first_name = $1, last_name = $2
    WHERE email = $3
    RETURNING* ;`

    return pool.query(queryString, values)
      .then((result) => {
        console.log('results are',result.rows[0])
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

  // Checks if item is in database and returns a boolean/true/false
  ifItemExists: (name, email) => {
    const values = [name.toLowerCase(), email];

    let queryString = `SELECT name
    FROM items
    JOIN users ON items.userid = users.id
    WHERE LOWER(items.name) =  $1 AND users.email = $2;
    `;

    return pool.query(queryString, values)
      .then((result) => {
        if (result.rows.length !== 0) {
          return true;
        }
        return false;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  ifItemExistsButFalse: (name, email) => {
    const values = [name.toLowerCase(), email];

    let queryString = `SELECT is_active
    FROM items
    JOIN users ON items.userid = users.id
    WHERE LOWER(items.name) =  $1 AND users.email = $2;
    `;

    return pool.query(queryString, values)
      .then((result) => {
        if (result.rows[0].is_active === false) {
          return true;
        }
        return false;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updataItemToTrue: (itemName, email) => {
    const values = [itemName.toLowerCase(), email];

    let queryString = `UPDATE items
    SET is_active = True
    FROM users WHERE items.userid = users.id
    AND LOWER(items.name) = $1 AND users.email = $2
    RETURNING*
    `;

    return pool.query(queryString, values)
      .then((result) => {
        if (result.rows[0].length !== 0) {
          return result.rows[0];
        }
        return false;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // This query should logically change the status of an active
  // item to an inactive item
  removeItem: (itemName, email) => {
    console.log('temove item working')
    const values = [itemName, email];
    let queryString = `UPDATE items
    SET is_active = false
    FROM users WHERE items.userid = users.id
    AND items.name = $1 AND users.email = $2
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

    let queryString = `SELECT items.*
    FROM items
    JOIN users ON users.id = items.userid
    WHERE users.email = $1 AND is_active = TRUE;
    `;

    return pool.query(queryString, values)
      .then((result) => {
        //console.log(result);
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  // Checks the database for item category
  grabItemCategory: (item) => {
    const values = [item.name.toLowerCase()];

    let queryString = `SELECT LOWER(name), name, category FROM data WHERE LOWER(name) = $1;
    `;

    return pool.query(queryString, values)
      .then((result) => {
        console.log('this category is:', result.rows[0].category);
        return result.rows[0];
      })
      .catch((err) => {
        console.log(err.message);
        return false;
      });
  },

  getUserName: (email) => {
    return pool.query(`SELECT * FROM users
    WHERE email = $1`, [`${email}`])
      .then((result) => {
        if (result) {
          if (result['rows'].length !== 0) {
            // Returns true if user email is in database
            console.log(result['rows'][0].first_name);
            return result['rows'][0].first_name;
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

  // Item exists and needs to be recatoregorized
  recategorizeItem: (item) => {
    const values = [item.name, item.category];

    let queryString = `UPDATE items SET category = $2 WHERE name = $1 RETURNING *
    `;

    return pool.query(queryString, values)
      .then((result) => {
        console.log('this category for:', result.rows[0].name, ' is ', result.rows[0].category);
        return [result.rows[0].name, result.rows[0].category];
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  recategorizeDB: (item) => {
    const values = [item.name, item.category];
    let queryString = `UPDATE items SET category = $2 WHERE name = $1 RETURNING *
    `;

    return pool.query(queryString, values)
      .then((result) => {
        console.log('this category for:', result.rows[0].name, ' is ', result.rows[0].category);
        return [result.rows[0].name, result.rows[0].category];
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  // Use this query to add items to be sorted
  addItemToDatabase: (item) => {
    const values = [item.name, item.category];

    let queryString = `INSERT INTO data (name, category) VALUES ($1, $2);
    SELECT * FROM data WHERE data.name = $1;
    `;

    return pool.query(queryString, values)
      .then((result) => {
        console.log('this category for:', result.rows[0].name, ' is ', result.rows[0].category);
        return [result.rows[0].name, result.rows[0].category];
      })
      .catch((err) => {
        console.log(err.message);
      });
  },



}
