# article-extractor

> A Node.js module to retrieve article content and metadata from a URL.

**This module is under heavy development! Its quality and API will probably change a lot, so keep an eye out for any changes.**

To see what features are coming up next, or if you'd like to suggest one yourself, go here: https://github.com/thomastuts/article-extractor/issues/3

## Demo
You can see `article-extractor` in action here:
```
GET http://article-extractor.thomastuts.com/parse?url=AN_ARTICLE_URL
```


## Installation
`npm install --save article-extractor`

## Extracting data
```js
var extractor = require('article-extractor');

extractor.extractData('http://paulgraham.com/altair.html', function (err, data) {
  console.log(data);
});

```

## Extract result
The result looks like this:
```json
{
    "domain": "thomastuts.com",
    "author": "Thomas Tuts",
    "title": "Article Extractor Demo",
    "summary": "A Node.js module to retrieve article content and metadata from a URL.",
    "content": "<p>This is the article content.</p>"
}
```
