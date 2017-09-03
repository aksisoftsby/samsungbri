
// where	φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
// note that angles need to be in radians to pass to trig functions!

/**
 R = 6371e3; // metres
 φ1 = lat1.toRadians();
 φ2 = lat2.toRadians();
 Δφ = (lat2 - lat1).toRadians();
 Δλ = (lon2 - lon1).toRadians();
 
 a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
 Math.cos(φ1) * Math.cos(φ2) *
 Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
 c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 d = R * c;
 **/


var BriMap = {
  map: {},
  watchId: {},
  lat: "lattitude",
  long: "longitude",
  lattitude: 0,
  longitude: 0,
  infowindow: {},
  createMarker: function createMarker(place) {
    placeLoc = place.geometry.location;
    marker = new google.maps.Marker({
      map: BriMap.map,
      position: place.geometry.location,
      icon: image = {
        url: place.icon,
        scaledSize: new google.maps.Size(20, 20), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      }
    });
    // console.log(place);
    /**
     dist = this.getDistance(
     this.lattitude, place.geometry.location.lat(),
     this.longitude, place.geometry.location.lng()
     );
     **/
    dist = geolib.getDistance(
      {latitude: this.lattitude, longitude: this.longitude},
      {latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()}
    );
    // console.log(dist);
    google.maps.event.addListener(marker, 'click', function () {
      k = place.name + "<br />" +
        place.formatted_address + "<br />" +
        "Jarak: " + dist + " meter"
        ;
      BriMap.infowindow = new google.maps.InfoWindow();
      BriMap.infowindow.setContent(k);
      BriMap.infowindow.open(map, this);
    });
  },
  rad: function (x) {
    return x * Math.PI / 180;
  },
  getDistance: function (lat1, lat2, long1, long2) {
    R = 6371e3; // metres
    φ1 = this.rad(lat1);
    φ2 = this.rad(lat2);
    λ1 = this.rad(long1);
    λ2 = this.rad(long2);

    x = Math.round((λ2 - λ1) * Math.cos((φ1 + φ2) / 2) * R);
    y = Math.round((φ2 - φ1) * R);

    return {est: x, nord: y};
  },
  init: function () {
    if (navigator.geolocation) {
      // watchId = navigator.geolocation.watchPosition(
      watchId = navigator.geolocation.getCurrentPosition(
        // success function
          function (position) {
            console.log(position);
            BriMap.lattitude = position.coords.latitude;
            BriMap.longitude = position.coords.longitude;
            store.set(BriMap.lat, BriMap.lattitude);
            store.set(BriMap.long, BriMap.longitude);
            $("#map").html("Mencari Bank BRI terdekat ...");
            lokasinasabah = new google.maps.LatLng(BriMap.lattitude, BriMap.longitude);
            BriMap.map = new google.maps.Map(document.getElementById('map'), {
              center: lokasinasabah,
              zoom: 14
            });
            marker = new google.maps.Marker({
              map: BriMap.map,
              position: {lat: BriMap.lattitude, lng: BriMap.longitude},
            });
            var request = {
              location: lokasinasabah,
              radius: '1000',
              // types: ['bank', 'atm'],
              // keyword: "bank bri",
              // name: "bank bri",
              language: "id",
              query: "'BANK BRI' or 'ATM BRI'"
            };
            service = new google.maps.places.PlacesService(BriMap.map);
            // service.nearbySearch(request,
            service.textSearch(request,
              function (results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                  // console.log(results);
                  for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    BriMap.createMarker(results[i]);
                  }
                }
              }
            );
            /**
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
             // $("#map").html(JSON.stringify(data));
             console.log(d);
             },
             error: function (data) {
             
             },
             dataType: 'JSONP',
             crossDomain: true,
             cache: false,
             type: 'GET'
             });
             **/
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

