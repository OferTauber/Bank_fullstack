const PASSWORD = process.env.PORT ? process.env.PASSWORD : require('./dev.js');

module.exports = PASSWORD;
