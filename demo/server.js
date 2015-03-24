var restify = require('restify');
var dissect = require('../index');
var server = restify.createServer();

server.use(restify.queryParser());

server.get('/parse', function (req, res, next) {
  var articleUrl = req.query.url;

  dissect.extractData(articleUrl, function (err, data) {
    res.json(data);
  });
});

server.listen(5050);
