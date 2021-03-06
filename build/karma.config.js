var multiEntry = require('rollup-plugin-multi-entry'),
  istanbul = require('rollup-plugin-istanbul'),
  rollup = require('./rollup.config').rollup,
  pkg = require('../package.json')

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    transports: ['websocket', 'polling', 'jsonp-polling'],
    frameworks: ['mocha', 'expect'],
    reporters: ['spec', 'istanbul'],
    files: ['../src/**/*.spec.js'],
    preprocessors: {
      '../src/**/*.spec.js': ['rollup']
    },
    rollupPreprocessor: {
      rollup: {
        plugins: [multiEntry(), istanbul({
          exclude: ['**/__tests__/*.spec.js', 'node_modules/**']
        })].concat(rollup.plugins)
      },
      bundle: {
        sourceMap: 'inline',
        useStrict: false,
        format: 'iife',
        moduleId: pkg.namespace,
        moduleName: pkg.namespace,
      }
    },
    autoWatch: true,
    istanbulReporter: {
      dir: '../coverage/',
      reporters: [{
        type: 'lcov'
      }, {
        type: 'text-summary'
      }]
    },
    concurrency: Infinity,
    client: {
      clearContext: false,
      captureConsole: false,
      mocha: {
        reporter: 'html', // change Karma's debug.html to the mocha web reporter
        ui: 'bdd'
      }
    },
    colors: true
  })
}
