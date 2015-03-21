var semantic = require('./semantic');

module.exports = {
  parse: function (url, callback) {
    semantic.extractData(url, function (err, semanticData) {
      callback(null, semanticData);
    });
  }
};
