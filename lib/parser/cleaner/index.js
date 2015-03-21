/**
 * Remove newlines and other useless stuff
 * Remove all attributes on inline elements
 * Remove unwanted attributes (style, width, height, ...)
 * Remove content that is not related to the article ('Click to...')
 * Remove links in images
 * Remove header elements with the article's title in them
 *
 */

var prepForParsing = require('./prep-for-parsing');

module.exports = {
  prepForParsing: prepForParsing
};
