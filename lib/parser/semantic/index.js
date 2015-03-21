var request = require('request');
var author = require('./author');
var content = require('./content');

module.exports = {
  extractData: function (url, callback) {
    request(url, function (err, response, body) {
      var data = {
        author: author.getAuthor(body),
        content: content.getArticleContent(body)
      };

      callback(null, data);
    });
  }
}
