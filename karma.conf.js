module.exports = function (karma) {
    karma.configure({

        // Karma configuration
        // Generated on Wed Jun 12 2013 10:54:17 GMT+0200 (CEST)

        // base path, that will be used to resolve files and exclude
        basePath: './',


        // frameworks to use
        frameworks: ['mocha', 'requirejs'],

        // list of files / patterns to load in the browser
        files: [{
            pattern: 'components/requirejs-text/text.js',
            included: false
        }, {
            pattern: 'components/x-tag-core/src/core.js',
            included: false
        }, {
            pattern: 'components/polymer/polymer.min.js',
            included: false
        }, {
            pattern: 'node_modules/chai/chai.js',
            included: false
        }, {
            pattern: 'wc.js',
            included: false
        }, {
            pattern: 'test/**/*.spec.js',
            included: false
        }, {
            pattern: 'test/tags/*',
            included: false
        }, 'test/main-karma.js'],


        // list of files to exclude
        exclude: [

        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'junit'],

        junitReporter: {
            outputFile: 'results/test-results.xml'
        },

        hostname: process.env.IP || 'localhost',

        // web server port
        port: process.env.PORT || 9876,


        // cli runner port
        runnerPort: process.env.PORT ? 0 : 9100,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: karma.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Firefox'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 1000 * 5,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,


        // plugins to load
        plugins: ['karma-junit-reporter', 'karma-mocha', 'karma-requirejs', 'karma-firefox-launcher']

    });
};