var cheerio = require('cheerio');
var _ = require('lodash');

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
    var blacklistRegex = /ads|social|comment|tags/i;

    var id = $(this).attr('id');
    var classes = $(this).attr('class');
    var idMatch = id ? id.match(blacklistRegex) : false;
    var classMatch = classes ? classes.match(blacklistRegex) : false;

    return idMatch || classMatch;
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

  if (candidates.length > 0) {
    var sortedByScore = _.sortBy(candidates, function (candidate) {
      return candidate.dissect.score;
    }).reverse();

    return $(sortedByScore[0]).html();
  }
  else {
    return null;
  }
}

function getContentByLongestLength(rawHtml) {
  var longestTextLength = 0;
  var $longest = null;
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

    return idMatch || classMatch;
  }).remove();

  $('*').each(function () {
    var textLength = $(this).clone().children().remove().end().text().length;
    if (textLength > longestTextLength) {
      $longest = $(this);
      longestTextLength = textLength;
    }
  });


  var content = $longest.html();

  // Replace any existing newlines with a space
  content = content.replace(/\r?\n|\r/g, ' ');

  // Replace any multiple breaks with newlines
  content = content.replace(/(<br\s?\/?>)\1+/g, '\n');

  // Replace any single breaks with newlines
  content = content.replace(/(<br\s?\/?>)/g, '\n');

  // Replace all paragraphs divided by newlines with actual paragraphs
  var paragraphs = content.split('\n');

  var contentInParagraphs = paragraphs.map(function (paragraph) {
    return '<p>' + paragraph + '</p>';
  }).join('');

  return contentInParagraphs;
}

function getArticleContent(rawHtml) {
  var content = getLikelyCandidate(rawHtml) || getContentByLongestLength(rawHtml);
  return content;
}

module.exports = {
  getArticleContent: getArticleContent
};
