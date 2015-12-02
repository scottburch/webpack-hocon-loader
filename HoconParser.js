var fs = require('fs');
var _ = require('lodash');

module.exports = {
    parse: text => {
        // Strip carriage returns
        text = text.replace(/\r/g, '');

        // Strip empty lines and comment lines
        text = text.replace(/\n\s*#[^\n]*/g, '');
        text = text.replace(/\n\s*\/\/[^\n]*/g, '');
        text = text.replace(/\n+/g, '\n');


        // Strip any commas at the end of lines
        text = text.replace(/,\s*(\n)/g, '$1');

        // Strip newlines off end
        text = text.replace(/[\s\n]+$/, '');

        // TODO: HACK: removing linkedvendor prop because I don't know what to do about it
        text = text.replace(/\n\s*linkedvendor=[^\n]+/g, '');
        return getObject(text);
    }
};

var getObject = text => {
    var quote = false;
    var out = text.split('');

    // convert to json type array
    var temp = out;
    out = [];
    temp.forEach((c, idx) => {
        c === '"' && (quote = !quote);
        switch(c) {

            // replace '=' with ':'
            case '=': quote ? out.push(c) : out.push(':'); break;

            // replace '{' with ':{' only after property name
            case '{': quote || /[^a-zA-Z0-9]/.test(previousChar(idx)) || out.push(':'); out.push(c); break;

            // add implied commas
            case '\n':
                /[^\{\[]/.test(previousChar(idx)) && /[^\}\]]/.test(nextChar(idx)) && out.push(',');
                out.push(c);
                break;

            // replace '.' in property names with '_dot_' token
            case '.': quote || (!isNaN(temp[idx-1]) && !isNaN(temp[idx+1]))  ? out.push(c) : out.push('_dot_'); break;

            // else just push the character
            default: out.push(c);
        }
    });
    var obj;
    eval(`obj = {${out.join('')}}`.replace(/\n/g, ''));
    obj = replace_dot_tokens(obj);
    return obj;

    function previousChar(idx) {
        var char = temp[idx-1];
        return char !== '\n' && char !== ' ' ? char : previousChar(idx-1);
    }

    function nextChar(idx) {
        var char = temp[idx+1];
        return char !== '\n' && char !== ' ' ? char : nextChar(idx+1);
    }

    function replace_dot_tokens(obj) {
        _.each(obj, (value, key) => {
            var origKey = key;
            key = key.replace(/_dot_/g, '.');
            var parts = key.split('.');
            if(parts.length > 1) {
                delete obj[origKey];
                var k = _.first(parts);
                obj[k] || (obj[k] = {});
                obj[k][_.rest(parts).join('_dot_')] = value;
                replace_dot_tokens(obj[k]);
            }
            _.isPlainObject(value) && replace_dot_tokens(value);
        });
        return obj;
    }
};




