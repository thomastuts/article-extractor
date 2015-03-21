var cheerio = require('cheerio');

function getValueByRelAttribute(html, relAttribute) {
  var $ = cheerio.load(html);
  var values = [];

  $('*[rel="' + relAttribute + '"]').each(function () {
    values.push($(this).text());
  });

  return values;
}

function getAuthor(html) {
  var authorRelAttributes = getValueByRelAttribute(html, 'author');
  if (authorRelAttributes[0]) {
    return authorRelAttributes[0];
  }
}

module.exports = {
  getAuthor: getAuthor
};
