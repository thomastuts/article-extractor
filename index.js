var parser = require('./lib/parser');
var fs = require('fs');
var path = require('path');

parser.parse('http://techcrunch.com/2015/03/20/from-the-8200-to-silicon-valley/', function (err, data) {
  fs.writeFileSync(path.join(process.cwd(), 'data/techcrunch.html'), data.content);

  parser.parse('http://paulgraham.com/altair.html', function (err, data) {
    fs.writeFileSync(path.join(process.cwd(), 'data/altair.html'), data.content);
  });
});
