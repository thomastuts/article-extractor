var cheerio = require('cheerio');

function getAuthor(html) {
  var $ = cheerio.load(html);

  var semanticAuthor = $('*[rel="author"]').text();
  var classAuthor = $('.author').text();
  return semanticAuthor || classAuthor;
}

module.exports = {
  getAuthor: getAuthor
};
