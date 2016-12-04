// unit-test.coonf.js for Landgrab-app & karma
// from https://github.com/JimTheMan/AngularJS-UGAT#Unit%20Tests
//
module.exports = function(config) {

  config.set({

    basePath: './app',

    files: [
      { pattern: 'www/lib/angular.js', watched: false },
  // simple pattern to load the needed testfiles
  // equal to {pattern: 'test/unit/*.spec.js', watched: true, served: true, included: true}
      'test/unit/*.spec.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      '**/*.module.js',
      '*!(.module|.spec).js',
      '!(bower_components)/**/*!(.module|.spec).js',
      '**/*.spec.js'
  // this file only gets watched and is otherwise ignored
  {pattern: 'app/index.html', included: false, served: false},
  ],

    singleRun: true,

    autoWatch: true,

    logLevel: 'WARN',

    frameworks: ['phantomjs-shim', 'jasmine', 'angular-filesort'],

    angularFilesort: {
      whitelist: [path.join(config.paths.src, '/**/!(*.html|*.spec|*.mock).js')]
    },

    browsers : ['PhantomJS'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-angular-filesort',
      'karma-phantomjs-shim',
      'karma-coverage',
      'karma-jasmine'
    ],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    reporters: ['progress'],

    proxies: {
      '/assets/': path.join('/base/', config.paths.src, '/assets/')
    }
  });
};

