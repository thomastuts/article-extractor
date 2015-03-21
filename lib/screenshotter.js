var webshot = require('webshot');

var screenDimensions = {
  width: 1920,
  height: 1080
};

var options = {
  screenSize: {
    width: screenDimensions.width,
    height: screenDimensions.height
  },
  shotSize: {
    width: screenDimensions.width,
    height: 'all'
  }
};

module.exports = {
  takeScreenshotOfPage: function (url, outputPath, callback) {
    webshot(url, outputPath, options, function (err) {
      if (callback) {
        callback();
      }
    });
  }
}


