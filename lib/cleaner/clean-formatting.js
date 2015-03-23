/**
 * Cleans up parsed HTML formatting by removing newlines.
 *
 * @param rawHtml
 * @returns {string}
 */
module.exports = function (rawHtml) {
  rawHtml = rawHtml
    .replace(/\n/g, '')
    .trim();

  return rawHtml;
};
