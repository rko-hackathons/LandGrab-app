angular.module('app.controllers', ['app.services'])
  
.controller('captureCtrl', function($scope, $cordovaGeolocation, $http, $rootScope, $state) {

  var PROXIMIIO_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6IjgwYjU0OTUxNjFkMzRkMjRjZDRjMWU5MWQ4NWRiYzUwIiwidHlwZSI6ImFwcGxpY2F0aW9uIiwiYXBwbGljYXRpb25faWQiOiJhNWJkNjdjYS1kYTBkLTRhMzgtYTZmMy0yYzA0ODUzYjM5ZTIifQ.vxz-cxJVh44Pj6GuzHvL3W8WVICX8lw2Wuf9G121LY8';

    $http.defaults.headers.common.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6IjgwYjU0OTUxNjFkMzRkMjRjZDRjMWU5MWQ4NWRiYzUwIiwidHlwZSI6ImFwcGxpY2F0aW9uIiwiYXBwbGljYXRpb25faWQiOiJhNWJkNjdjYS1kYTBkLTRhMzgtYTZmMy0yYzA0ODUzYjM5ZTIifQ.vxz-cxJVh44Pj6GuzHvL3W8WVICX8lw2Wuf9G121LY8';

    
    var options = {timeout: 10000, enableHighAccuracy: true};
 
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
     
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     
        var mapOptions = {
          center: latLng,
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
     
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        
        google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
          var marker = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.BOUNCE,
              position: latLng
          });      
         
          var infoWindow = new google.maps.InfoWindow({
              content: "You Are Here"
          });
         
          google.maps.event.addListener(marker, 'click', function () {
              infoWindow.open($scope.map, marker);
          });
         
        });
        

        $scope.getGeofences();

     
      }, function(error){
        console.log("Could not get location");
        console.log (error);
      });
      
      $scope.getGeofences = function (){
        $http.get("http://api.proximi.fi/core/geofences")
          .then(function(response) {
              //First function handles success
              console.log (response);
              response.data.forEach(function(element, index, array) {
                if (index != 0){
                  //console.log (element.address);
                  $scope.drawGeofenceMarker (element.geopoint, element.address, element.radius);
                }
              });
          }, function(response) {
              //Second function handles error
              console.log ('getGeofences Error:' + response);
          });
      }

      $scope.drawGeofenceMarker = function(coor, address, rad){       

        var marker = new google.maps.Marker({
          map: $scope.map,
          position: {lat: coor[1], lng: coor[0]},
          animation: google.maps.Animation.DROP
        });

        var infoWindow = new google.maps.InfoWindow({
              content: address
          });
         
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open($scope.map, marker);
        });
       

        // Add circle overlay and bind to marker
        var circle = new google.maps.Circle({
          map: $scope.map,
          radius: rad,    // 10 miles in metres
          strokeColor:"#0000FF",
          strokeOpacity:0.8,
          strokeWeight:2,
          fillColor:"#0000FF",
          fillOpacity:0.4
        });
        circle.bindTo('center', marker, 'position');
      }
      
      $scope.claim = function(){
        if ($rootScope.areaclaimed) $state.go ('tabsController.AreaName');
        else $state.go ('tabsController.setQuestionForAreaName');
      }

})
   
.controller('cartTabDefaultPageCtrl', function($scope) {

})
   
.controller('cloudTabDefaultPageCtrl', function($scope) {

})
         
.controller('splashCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope) {

})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('AreaNameCtrl', function($scope) {
  
  $scope.areaquestion = {
    by: 'Edward Smith',
    street: 'Shatin',
    answer1: 'Best building',
    answer2: 'The One Building',
    answer3: 'Tallest building'
  }

})
   
.controller('AreaName2Ctrl', function($scope) {
  
  $scope.correctanswer = true;
  
  $scope.claimedtip = 'The park is a nice place to jog!';

})
   
.controller('setQuestionForAreaNameCtrl', function($scope) {

})
   
.controller('earnedTipsCtrl', function($scope) {
  
  $scope.tips = [{area: 'Shatin', content: 'museum is free to visit on Wednesday'}, {area: 'Kowloon', content: 'Be sure to check out the ferry!'}];

})
   
.controller('leaderboardCtrl', function($scope) {
  $scope.leaderboard = [{name: 'John Smith', areas: 5}, {name: 'Edward Smith', areas: 2}];

})
   
.controller('profileCtrl', function($scope) {
  $scope.areasclaimed = ['Shatin', 'Kowloon'];

})
 