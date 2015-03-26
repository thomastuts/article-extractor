var extractor = require('./index');
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
  },
  {
    url: 'http://www.economist.com/news/united-states/21646763-when-lethal-injection-gets-tricky-try-guns-or-gas-drugs-dont-work',
    filename: 'the-economist'
  },
  {
    url: 'http://onstartups.com/insider-look-at-hubspot-sidekick-growth-approach',
    filename: 'on-startups'
  },
  {
    url: 'http://www.smashingmagazine.com/2015/03/20/better-browser-input-events/',
    filename: 'smashing-magazine'
  },
  {
    url: 'http://nextviewventures.com/blog/pretotyping-product-market-fit-google-alberto-savoia/',
    filename: 'next-view-ventures'
  }
];

async.each(articlesToParse, function (articleToParse, parseCallback) {
  extractor.extractData(articleToParse.url, function (err, data) {
    console.log('Parsed article:', data.title);
    console.log(data.summary);
    console.log('-----');
    fs.writeFileSync(path.join(process.cwd(), 'data/' + articleToParse.filename + '.html'), data.content);
    parseCallback();
  });
}, function () {
  process.exit(0);
});
