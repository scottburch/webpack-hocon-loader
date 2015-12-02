var HoconParser = require('./HoconParser');

module.exports = function(source) {
     return JSON.stringify(HoconParser.parse(source));
};