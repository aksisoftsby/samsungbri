var BriMap = {
  map: {},
  watchId: {},
  lat: "lattitude",
  long: "longitude",
  lattitude: 0,
  longitude: 0,
  init: function () {
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        // success function
          function (position) {
            console.log(position);
            BriMap.lattitude = position.coords.latitude;
            BriMap.longitude = position.coords.longitude;
            store.set(BriMap.lat, BriMap.lattitude);
            store.set(BriMap.long, BriMap.longitude);
            $("#map").html("Mencari Bank BRI terdekat ...");
            $.ajax({
              'url': "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
              'data': {
                location: BriMap.lattitude + ',' + BriMap.longitude,
                radius: 500,
                type: "bank",
                keyword: "Bank BRI",
                key: "AIzaSyA4ER1iJKnhXLeK1QLwHl-1cySxDpdHSWs",
                language: "id",
              },
              'success': function (data) {
                d = data;
                $("#map").html(JSON.stringify(data));
                console.log(d);
              },
              error: function (data) {
                
              },
              dataType: 'json',
              type: 'get'
            });
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
    },
  createmap: function () {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }
}

