var cheerio = require('cheerio');

var metatags = [
  'description',
  'og:description',
  'twitter:description'
];

/**
 * Gets the summary based on social metatags that are found in most blogs for sharing purposes.
 *
 * @param rawHtml
 * @returns {string}
 */
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

/**
 * Gets the summary by retrieving the article's content and returning the first interesting paragraph. Most definitely
 * not a silver bullet here, but at least it gets the job done in case there's no better option.
 *
 * @param rawHtml
 * @returns {string}
 */
function getSummaryFromContent(content) {
  var $ = cheerio.load(content);

  var interestingParagraphs = $('p').filter(function () {
    return $(this).text().length > 25;
  });

  return $(interestingParagraphs[0]).text();
}

module.exports = {
  getSummary: function (rawHtml, content) {
    var summaryFromMetags = getSummaryFromMetatags(rawHtml);

    if (summaryFromMetags) {
      return summaryFromMetags;
    }
    else {
      return getSummaryFromContent(content);
    }
  }
};
