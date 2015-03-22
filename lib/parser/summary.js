var cheerio = require('cheerio');
var content = require('./content');

var metatags = [
  'description',
  'og:description',
  'twitter:description'
];

function getSummaryFromMetatags(rawHtml) {
  var $ = cheerio.load(rawHtml);

  for (var i = 0; i < metatags.length; i++) {
    var metatag = metatags[i];
    var description = $('meta[property="' + metatag + '"]').attr('content');

    if (description) {
      return description;
    }
  }
}

function getSummaryFromContent(rawHtml) {
  var parsedContent = content.getArticleContent(rawHtml);
  var $ = cheerio.load(parsedContent);

  var eligibleParagraphs = $('p').filter(function () {
    return $(this).text().length > 100;
  });

  return $(eligibleParagraphs[0]).text();
}

module.exports = {
  getSummary: function (rawHtml) {
    var summaryFromMetags = getSummaryFromMetatags(rawHtml);

    if (summaryFromMetags) {
      return summaryFromMetags;
    }
    else {
      return getSummaryFromContent(rawHtml);
    }
  }
};
