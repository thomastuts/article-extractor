var cheerio = require('cheerio');

var elementsToRemove = [
  'script',
  'header',
  'footer'
];

module.exports = function (rawHtml) {
  var $ = cheerio.load(rawHtml);

  var $body = $('body');

  // Strip all unwanted elements
  elementsToRemove.forEach(function (elementToRemove) {
    $body.find(elementToRemove).remove();
  });

  // Remove ads, social & comment stuff
  $body.find('*').filter(function () {
    var blacklistRegex = /ads|social|comment|tags/i;

    var id = $(this).attr('id');
    var classes = $(this).attr('class');
    var idMatch = id ? id.match(blacklistRegex) : false;
    var classMatch = classes ? classes.match(blacklistRegex) : false;

    return idMatch || classMatch;
  }).remove();

  return $.html();
}
