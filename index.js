var parser = require('./lib/parser');
var fs = require('fs');
var path = require('path');

parser.parse('http://www.wired.com/2015/03/google-android-broken-wifi/', function (err, data) {
  fs.writeFileSync(path.join(process.cwd(), 'data/wired.html'), data.content);
});
