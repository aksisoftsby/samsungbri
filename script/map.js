var BriMap = {
  map: {},
  watchId: {},
  init: function () {
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        // success function
          function (position) {
            document.getElementById('locationInfo').innerHTML = 'Latitude: '
              + position.coords.latitude +
              '<br/>Longitude: ' + position.coords.longitude;
          },
          // error function    
            function (error) {
              errorInfo = document.getElementById('locationInfo');
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  errorInfo.innerHTML = 'User denied the request for Geolocation.';
                  break;
                case error.POSITION_UNAVAILABLE:
                  errorInfo.innerHTML = 'Location information is unavailable.';
                  break;
                case error.TIMEOUT:
                  errorInfo.innerHTML = 'The request to get user location timed out.';
                  break;
                case error.UNKNOWN_ERROR:
                  errorInfo.innerHTML = 'An unknown error occurred.';
                  break;
              }
            });
        } else {
        document.getElementById('locationInfo').innerHTML = 'Geolocation is not supported.';
      }
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }
}

