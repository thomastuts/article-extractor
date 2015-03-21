var parser = require('./lib/parser');
var fs = require('fs');
var path = require('path');
var async = require('async');

var articlesToParse = [
  {
    url: 'http://gizmodo.com/watch-a-single-day-on-the-london-tube-in-two-minutes-1692810056',
    filename: 'gizmodo'
  },
  {
    url: 'http://www.wired.com/2015/03/google-android-broken-wifi/',
    filename: 'wired'
  },
  {
    url: 'http://techcrunch.com/2015/03/20/from-the-8200-to-silicon-valley/',
    filename: 'techcrunch'
  },
  {
    url: 'http://paulgraham.com/altair.html',
    filename: 'paulgraham'
  }
];

async.each(articlesToParse, function (articleToParse, parseCallback) {
  parser.parse(articleToParse.url, function (err, data) {
    fs.writeFileSync(path.join(process.cwd(), 'data/' + articleToParse.filename + '.html'), data.content);
    parseCallback();
  });
}, function () {
  process.exit(0);
});
