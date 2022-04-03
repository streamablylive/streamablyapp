const faunadb = require('faunadb');
const q = faunadb.query

const clientQuery = new faunadb.Client({
  secret: "fnAEXlzXTHAAxRFWbIDV7b90lzrS0dFtdzXd9rG_",
  // user secret: 'fnAEf5ICcFAAxYPLk9__v2a-9pE_QwPZ1mJwkj2w',
  domain: 'db.eu.fauna.com',
  scheme: 'https',
});

module.exports = { clientQuery, q };
