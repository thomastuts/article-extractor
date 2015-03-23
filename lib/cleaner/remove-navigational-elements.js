var cheerio = require('cheerio');
var _ = require('lodash');

/**
 * Removes all elements that are used for navigation (such as 'to top' links, article tags, ...)
 *
 * @param rawHtml
 */
module.exports = function (rawHtml) {
  var $ = cheerio.load(rawHtml);

  $('a').filter(function () {
    var hasTopInText = $(this).text().toLowerCase().indexOf('top') > -1;
    var hasHashInHref = $(this).attr('href').indexOf('#') > -1;
    return hasTopInText && hasHashInHref;
  }).remove();

  return $.html();
}
