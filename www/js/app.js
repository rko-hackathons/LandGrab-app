// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordova'])

.run(function($ionicPlatform, Proximiio) {
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
    
    var PROXIMIIO_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6IjgwYjU0OTUxNjFkMzRkMjRjZDRjMWU5MWQ4NWRiYzUwIiwidHlwZSI6ImFwcGxpY2F0aW9uIiwiYXBwbGljYXRpb25faWQiOiJhNWJkNjdjYS1kYTBkLTRhMzgtYTZmMy0yYzA0ODUzYjM5ZTIifQ.vxz-cxJVh44Pj6GuzHvL3W8WVICX8lw2Wuf9G121LY8';

        //Proximiio.init ('a', 'b', 'c');
    function initProximiio() {
        proximiio.setToken(PROXIMIIO_TOKEN);
        proximiio.setDebugOutput(true, null, null);
        
          proximiio.setProximiioReadyCallback(function(visitorId) {
            //document.getElementById("visitor_id").innerHTML = visitorId;
            console.log (visitorId);
          })
    
        proximiio.setOutputTriggerCallback(function (output) {
          // Your code here
        });
    
        proximiio.setInputTriggerCallback(function(enter, geofence) {
          // Your code here
        });
    
        proximiio.setPositionChangeCallback(function(coords) {
          // Your code here, for example:
          //document.getElementById("position-latitude").innerHTML = coords.coordinates.lat;
          //document.getElementById("position-longitude").innerHTML = coords.coordinates.lon;
          //document.getElementById("position-accuracy").innerHTML = coords.accuracy;
        });
    };
    initProximiio();
  });
})