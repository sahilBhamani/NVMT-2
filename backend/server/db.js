const { Pool } = require('pg');

const pool = new Pool({
  user: 'sahil',
  host: 'localhost',
  database: 'nvmtdb',
  password: '123456',
  port: 5432, 
});

module.exports = pool;
