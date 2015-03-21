var parser = require('./lib/parser');

parser.parse('http://techcrunch.com/2015/03/20/from-the-8200-to-silicon-valley/', function (err, data) {
  console.log(data);
});
