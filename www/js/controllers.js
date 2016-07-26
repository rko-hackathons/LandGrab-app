angular.module('app.controllers', ['app.services'])
  
.controller('captureCtrl', function($scope, $cordovaGeolocation) {
    
    var options = {timeout: 10000, enableHighAccuracy: true};
 
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
     
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
     
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        
        google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
          var marker = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: latLng
          });      
         
          var infoWindow = new google.maps.InfoWindow({
              content: "You Are Here"
          });
         
          google.maps.event.addListener(marker, 'click', function () {
              infoWindow.open($scope.map, marker);
          });
         
        });
     
      }, function(error){
        console.log("Could not get location");
        console.log (error);
      });
      

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

})
   
.controller('AreaName2Ctrl', function($scope) {

})
   
.controller('setQuestionForAreaNameCtrl', function($scope) {

})
   
.controller('earnedTipsCtrl', function($scope) {

})
   
.controller('leaderboardCtrl', function($scope) {

})
   
.controller('profileCtrl', function($scope) {

})
 