var request = require('request');
var cleaner = require('../cleaner');
var author = require('./author');
var content = require('./content');

module.exports = {
  extractData: function (url, callback) {
    request(url, function (err, response, body) {
      var preppedHtml = cleaner.prepForParsing(body);

      var data = {
        author: author.getAuthor(preppedHtml),
        content: content.getArticleContent(preppedHtml)
      };

      callback(null, data);
    });
  }
}
