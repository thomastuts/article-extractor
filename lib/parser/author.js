var cheerio = require('cheerio');

/**
 * Tries to get the author from three sources: the `<meta name="author">` tag, any anchors with the `rel="author"`
 * attribute or, as a last resort, the text value from a DOM element with an `author` class.
 *
 * @param html
 * @returns {string}
 */
function getAuthor(html) {
  var $ = cheerio.load(html);

  var metatagAuthor = $('meta[name="author"]').text();
  var semanticAuthor = $('*[rel="author"]').text();
  var classAuthor = $('.author').text();
  return metatagAuthor || semanticAuthor || classAuthor;
}

module.exports = {
  getAuthor: getAuthor
};
