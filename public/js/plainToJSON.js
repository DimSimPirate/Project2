//Will convert the plaintext file to JSON
var fs = require('fs');
var toJSON = require('plain-text-data-to-json');

var doc = fs.readFileSync('public/bot.txt', 'utf8');

var data = toJSON(doc);

fs.writeFileSync('bot.json', JSON.stringify(data, null, 2) + '\n');