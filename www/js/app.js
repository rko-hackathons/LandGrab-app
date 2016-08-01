/* Ionic Starter App
 *
 * uses versions: 
 *  ionic:        1.2.4
 *  firebase:     2.4.0
 *  angularfire:  1.1.3
 * 
 * To edit the SASS, use gulp:
 * npm install -g gulp
 * 
 * Also install the following ngCordova plugins:
 *  cordova plugin add cordova-plugin-inappbrowser
 *  cordova plugin add ionic-plugin-keyboard
 */

//var FBURL                 = "<YOUR-FB-URL>";
var FBURL                 = "https://landgrab.firebaseio.com/";
var POST_MAX_CHAR         = 150;

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
	'ionic', 
	'ngCordova',
	"firebase",

	// custom code
	'app.controllers', 
	'app.routes', 
	'app.services',
	'app.directives',

  // auth and profile
  'app.controllers-account',
  'app.services-auth',
  'app.services-profile',
  
  // cordova
  'app.services-cordova-camera',
  
  // helpers
  'app.services-codes',
  'app.services-utils',
  'app.services-fb-functions'
  ]
)

.run(function($ionicPlatform, Proximiio, $http, $rootScope, $state, $ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    console.log ('platformready');

    $rootScope.entered=false;
    // capture.html not loaded yet!
    //document.getElementById("area-name").innerHTML = 'Rest of the world';
    
    $rootScope.enterarea = function(){
      $rootScope.areaclaimed = true;
      $rootScope.areaentered = {
        claimedby: 'John Smith'
      }
      //console.log ($rootScope.areaclaimed);
    }
    
    $rootScope.enterarea();
    // $rootScope.areaname set in proximiio.setInputTriggerCallback
    $rootScope.areaname = 'Area';
    
    var PROXIMIIO_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6IjgwYjU0OTUxNjFkMzRkMjRjZDRjMWU5MWQ4NWRiYzUwIiwidHlwZSI6ImFwcGxpY2F0aW9uIiwiYXBwbGljYXRpb25faWQiOiJhNWJkNjdjYS1kYTBkLTRhMzgtYTZmMy0yYzA0ODUzYjM5ZTIifQ.vxz-cxJVh44Pj6GuzHvL3W8WVICX8lw2Wuf9G121LY8';

    $http.defaults.headers.common.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6IjgwYjU0OTUxNjFkMzRkMjRjZDRjMWU5MWQ4NWRiYzUwIiwidHlwZSI6ImFwcGxpY2F0aW9uIiwiYXBwbGljYXRpb25faWQiOiJhNWJkNjdjYS1kYTBkLTRhMzgtYTZmMy0yYzA0ODUzYjM5ZTIifQ.vxz-cxJVh44Pj6GuzHvL3W8WVICX8lw2Wuf9G121LY8';

        //Proximiio.init ('a', 'b', 'c');
    function initProximiio() {
        proximiio.setToken(PROXIMIIO_TOKEN);
        proximiio.setDebugOutput(true, null, null);
        
          proximiio.setProximiioReadyCallback(function(visitorId) {
            //document.getElementById("visitor_id").innerHTML = visitorId;
            console.log ("visitorId: "+visitorId);
          })
    
        proximiio.setOutputTriggerCallback(function (output) {
          // Your code here
          console.log ("output: "+output);
        });
    
        proximiio.setInputTriggerCallback(function(enter, geofence) {
          // Your code here
          console.log ("Entered "+geofence.address);
          $rootScope.entered=true;
          document.getElementById("area-name").innerHTML = geofence.address;
          console.log ("entered:"+$rootScope.entered);
          
          $rootScope.areaname = geofence.address;
          
          $rootScope.enterarea();
        });
    
        proximiio.setPositionChangeCallback(function(coords) {
          // Your code here, for example:
          //document.getElementById("position-latitude").innerHTML = coords.coordinates.lat;
          //document.getElementById("position-longitude").innerHTML = coords.coordinates.lon;
          //document.getElementById("position-accuracy").innerHTML = coords.accuracy;
        });

        // proximiio.setGeofenceTriggerCallback(function(enter, geofence) {                          
        // });


        console.log ('proximiio');
    };
    //initProximiio();
  });

    // Redirect the user to the login state if unAuthenticated
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.log("$stateChangeError", error);
    event.preventDefault(); // http://goo.gl/se4vxu
    if(error == "AUTH_LOGGED_OUT") {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('tabsController.profile');
    } else {
 	initProximiio();
    }
  });
})
