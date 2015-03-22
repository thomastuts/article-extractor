var request = require('request');
var cleaner = require('./lib/cleaner');
var author = require('./lib/parser/author');
var content = require('./lib/parser/content');
var title = require('./lib/parser/title');
var summary = require('./lib/parser/summary');

module.exports = {
  extractData: function (url, callback) {
    request(url, function (err, response, body) {
      var preppedHtml = cleaner.prepForParsing(body);

      var data = {
        author: author.getAuthor(preppedHtml),
        content: content.getArticleContent(preppedHtml),
        title: title.getTitle(preppedHtml),
        summary: summary.getSummary(preppedHtml)
      };

      callback(null, data);
    });
  }
}
