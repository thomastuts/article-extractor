var cheerio = require('cheerio');
var _ = require('lodash');
var cleaner = require('../cleaner');

function getLikelyCandidate(rawHtml) {
  var $ = cheerio.load(rawHtml);
  var $body = $('body');
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
  content = cleaner.cleanAfterParsing(content);
  return content;
}

module.exports = {
  getArticleContent: getArticleContent
};
