var hParser = require('./HoconParser');
var text = '';

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
    var d = process.stdin.read();
    d !== null && (text += d);
});

process.stdin.on('end', function() {
    console.log(JSON.stringify(hParser.parse(text)));
});



