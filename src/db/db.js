const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'ayushi',
  port: 5432,
  database: 'stackoverflowsearch'
});

pool.on('connect', () => {
  console.log('Database Connected');
});

const runQuery = async (query) => {
  new Promise((resolve, reject) => {
    pool.connect((connectErr, client, release) => {
      if (connectErr) {
        reject(connectErr);
      } else {
        client
          .query(query)
          .then((result) => {
            release();
            resolve(result);
          })
          .catch((err) => {
            release();
            reject(err);
          });
      }
    });
  });
};

module.exports = runQuery;
