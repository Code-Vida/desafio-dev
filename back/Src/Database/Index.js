require('./Bootstrap');

//const Tedious = require('tedious');

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  operatorAliases: false,
  define: {
    timestamps: false,
    underscored: false,
    underscoredAll: false,
  },
};

