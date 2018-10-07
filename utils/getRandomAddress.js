const comprehension = require('./comprehension');

module.exports = () => `0x${comprehension(40, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
