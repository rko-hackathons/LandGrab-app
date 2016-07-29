angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  // Define the resolve function, which checks whether the user is Authenticated
  // It fires $stateChangeError if not the case
  var authResolve = function (Auth) {
    return Auth.getAuthState();
  };

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('tabsController.capture', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/capture.html',
        controller: 'captureCtrl'
      }
    }
  })

  .state('cartTabDefaultPage', {
    url: '/page3',
    templateUrl: 'templates/cartTabDefaultPage.html',
    controller: 'cartTabDefaultPageCtrl'
  })

  .state('cloudTabDefaultPage', {
    url: '/page4',
    templateUrl: 'templates/cloudTabDefaultPage.html',
    controller: 'cloudTabDefaultPageCtrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('splash', {
    url: '/page5',
    templateUrl: 'templates/splash.html',
    controller: 'splashCtrl'
  })

//  .state('login', {
//    url: '/page6',
//    templateUrl: 'templates/login.html',
//    controller: 'loginCtrl'
//  })

//  .state('signup', {
//    url: '/page7',
//    templateUrl: 'templates/signup.html',
//    controller: 'signupCtrl'
//  })

  .state('tabsController.AreaName', {
    url: '/page8',
    views: {
      'tab1': {
        templateUrl: 'templates/AreaName.html',
        controller: 'AreaNameCtrl'
      }
    }
  })

  .state('tabsController.AreaName2', {
    url: '/page9',
    views: {
      'tab1': {
        templateUrl: 'templates/AreaName2.html',
        controller: 'AreaName2Ctrl'
      }
    }
  })

  .state('tabsController.setQuestionForAreaName', {
    url: '/page10',
    views: {
      'tab1': {
        templateUrl: 'templates/setQuestionForAreaName.html',
        controller: 'setQuestionForAreaNameCtrl'
      }
    }
  })

  .state('tabsController.earnedTips', {
    url: '/page11',
    views: {
      'tab2': {
        templateUrl: 'templates/earnedTips.html',
        controller: 'earnedTipsCtrl'
      }
    }
  })

  .state('tabsController.leaderboard', {
    url: '/page12',
    views: {
      'tab3': {
        templateUrl: 'templates/leaderboard.html',
        controller: 'leaderboardCtrl'
      }
    }
  })

  .state('tabsController.profile', {
    //url: '/page13',
    url: '/account/:nextState',
    //url: '/account/:nextState',
    views: {
      //'tab4': {
      'tab-account': {
        //templateUrl: 'templates/profile.html',
        //controller: 'profileCtrl'
	templateUrl: 'templates/auth/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/page2')

});
