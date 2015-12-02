var HoconParser = require('./HoconParser');

module.exports = function(source) {
     this.cacheable && this.cacheable();
     var value = HoconParser.parse(source);
     this.value = [value];
     return "module.exports = " + JSON.stringify(value, undefined, "\t") + ";";
};
