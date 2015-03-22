var cheerio = require('cheerio');

var titleMetatags = [
  'og:title',
  'twitter:title'
];

var sitenameMetatags = [
  'og:site_name',
  'twitter:domain'
];

function getTitleFromMetaTags(rawHtml) {
  var $ = cheerio.load(rawHtml);
  var title;
  var sitename;

  for (var i = 0; i < titleMetatags.length; i++) {
    var metatag = titleMetatags[i];
    title = $('meta[property="' + metatag + '"]').attr('content');

    if (title) {
      break;
    }
  }

  for (var i = 0; i < sitenameMetatags.length; i++) {
    var metatag = sitenameMetatags[i];
    sitename = $('meta[property="' + metatag + '"]').attr('content');

    if (sitename) {
      break;
    }
  }

  if (sitename) {
    title = title.replace(sitename, '');
    var lastChar = title.charAt(title.length - 1);

    while (!/[a-zA-Z]/.test(lastChar)) {
      title = title.substring(0, title.length - 1);
      lastChar = title.charAt(title.length - 1);
    }
  }

  return title;
}

function getTitleFromWindowTitle(rawHtml) {
  var $ = cheerio.load(rawHtml);
  return $('title').text();
}

module.exports = {
  getTitle: function (rawHtml) {
    return getTitleFromMetaTags(rawHtml) || getTitleFromWindowTitle(rawHtml);
  }
};
