var cheerio = require('cheerio');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var elementsToRemove = [
  'script',
  'header',
  'footer'
];

function getLikelyCandidate(rawHtml) {
  var $ = cheerio.load(rawHtml);

  var $body = $('body');

  // Strip all unwanted elements
  elementsToRemove.forEach(function (elementToRemove) {
    $body.find(elementToRemove).remove();
  });

  // Remove ads, social & comment stuff
  $body.find('*').filter(function () {
    var id = $(this).attr('id');
    var classes = $(this).attr('class');

    var idMatch = id ? id.match(/ads?|social|comment/i) : false;
    var classMatch = classes ? classes.match(/ads?|social|comment/i) : false;

    return false;
  }).remove();

  var candidates = [];

  $body.find('p').each(function () {
    var paragraph = $(this);
    var parentNode = $(this).get(0).parentNode;

    if (!parentNode.dissect) {
      parentNode.dissect = {
        score: 0
      };
      candidates.push(parentNode);
    }

    var paragraphLength = paragraph.text().length;
    parentNode.dissect.score += paragraphLength;
  });

  candidates.forEach(function (candidate) {
    console.log('Score:', candidate.dissect.score);
  });

  if (candidates.length > 0) {
    var sortedByScore = _.sortBy(candidates, function (candidate) {
      return candidate.dissect.score;
    }).reverse();

    return sortedByScore[0];
  }
  else {
    return null;
  }
}

function getArticleContent(rawHtml) {
  var $likelyCandidate = getLikelyCandidate(rawHtml);

  fs.writeFileSync(path.join(process.cwd(), 'data/article.html'), $likelyCandidate.html());
}

module.exports = {
  getArticleContent: getArticleContent
};
