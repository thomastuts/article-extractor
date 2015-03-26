var restify = require('restify');
var extractor = require('../index');
var server = restify.createServer();

server.use(restify.queryParser());

server.get('/parse', function (req, res, next) {
  var articleUrl = req.query.url;

  extractor.extractData(articleUrl, function (err, data) {
    res.json(data);
  });
});

server.listen(5050);
