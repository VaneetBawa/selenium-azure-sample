username= process.env.LT_USERNAME || "<your username>",
accessKey=  process.env.LT_ACCESS_KEY || "<your accessKey>",

exports.config = {
  'specs': [ '../specs/local.js' ],

  seleniumAddress: 'https://'+username+':'+accessKey+'@hub.lambdatest.com/wd/hub',

   'commonCapabilities': {
    'build': 'protractor-selenium-sample',
    'name': 'parallel-local-test',
    'tunnel': true
  },

  'multiCapabilities': [{
    'browserName': 'Chrome',
    'version':'latest',
    'platform': 'WIN10'
  },{
    'browserName': 'Safari',
    'version':'latest',
    'platform': 'macOS 10.12'
  },{
    'browserName': 'Edge',
    'version':'latest',
    'platform': 'WIN10'
  },{
    'browserName': 'Firefox',
    'version':'latest',
    'platform': 'WIN10'
  },{
    'browserName': 'Internet explorer',
    'version':'latest',
    'platform': 'WIN10'
  }],

  onPrepare: () => {

    myReporter = {
        specStarted: function(result) {
          specStr= result.id
          spec_id = parseInt(specStr[specStr.length -1])
          browser.getProcessedConfig().then(function (config) {
            var fullName = config.specs[spec_id];
            //var fileName = fullName.substring(fullName.lastIndexOf('/')+1);
            browser.executeScript("lambda-name="+fullName.split(/(\\|\/)/g).pop())
          });
        }
      };
      jasmine.getEnv().addReporter(myReporter);
  },
  onComplete: () => {
    browser.quit();
  }

};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
