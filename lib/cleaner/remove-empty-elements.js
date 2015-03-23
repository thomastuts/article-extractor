var cheerio = require('cheerio');
var _ = require('lodash');

/**
 * Removes all empty elements.
 *
 * @param rawHtml
 */
module.exports = function (rawHtml) {
  var $ = cheerio.load(rawHtml);

  $('*').each(function () {
    var children = $(this).children().length;
    var content = $(this).text().replace(/\t|\s/g, '');

    if (!children && !content) {
      $(this).remove();
    }
  });

  return $.html();
}
