var cheerio = require('cheerio');
var _ = require('lodash');

var attributesToKeep = [
  'src',
  'href',
  'target'
];

module.exports = function (rawHtml) {
  var $ = cheerio.load(rawHtml);

  $('*').each(function () {
    var element = this;
    var attributes = _.chain(element.attribs)
      .keys()
      .difference(attributesToKeep)
      .value();

    attributes.forEach(function (attribute) {
      $(element).removeAttr(attribute);
    });
  });

  return $.html();
}
