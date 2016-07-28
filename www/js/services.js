    var PROXIMIIO_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6IjgwYjU0OTUxNjFkMzRkMjRjZDRjMWU5MWQ4NWRiYzUwIiwidHlwZSI6ImFwcGxpY2F0aW9uIiwiYXBwbGljYXRpb25faWQiOiJhNWJkNjdjYS1kYTBkLTRhMzgtYTZmMy0yYzA0ODUzYjM5ZTIifQ.vxz-cxJVh44Pj6GuzHvL3W8WVICX8lw2Wuf9G121LY8';
angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])
  .factory("Proximiio", function() {
    return {
      init: function(outputTriggerCallback, inputTriggerCallback, positionChangeCallback) {
        proximiio.setToken(PROXIMIIO_TOKEN);
        proximiio.setDebugOutput(true, null, null);
        proximiio.setOutputTriggerCallback(outputTriggerCallback);
        proximiio.setInputTriggerCallback(inputTriggerCallback);
        proximiio.setPositionChangeCallback(positionChangeCallback);
        console.log ('hi');
      }
    };
});