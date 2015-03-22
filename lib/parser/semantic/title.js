var cheerio = require('cheerio');

var metatags = [
  'og:title',
  'twitter:title'
];

function getTitleFromMetaTags(rawHtml) {
  var $ = cheerio.load(rawHtml);

  for (var i = 0; i < metatags.length; i++) {
    var metatag = metatags[i];
    var title = $('meta[property="' + metatag + '"]').attr('content');

    if (title) {
      return title;
    }
  }
}

function getTitleFromWindowTitle(rawHtml) {
  var $ = cheerio.load(rawHtml);
  return $('title').text();
}

module.exports = {
  getTitle: function (rawHtml) {
    return getTitleFromMetaTags(rawHtml) || getTitleFromWindowTitle(rawHtml);
  }
};
