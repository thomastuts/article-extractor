var screenshotter = require('./lib/screenshotter');

screenshotter.takeScreenshotOfPage('techcrunch.com/2015/03/20/from-the-8200-to-silicon-valley/', 'data/techcrunch.png', function () {
  process.exit(0);
});

