var BriMap = {
  map: {},
  watchId: {},
  lat: "lattitude",
  long: "longitude",
  lattitude: 0,
  longitude: 0,
  infowindow: {},
  setContent: {},
  marker: {},
  listdata: {
    me: [],
    bank: [],
    atm: []
  },
  createMarker: function (place, i) {
    // console.log(place);
    if (place.types[0] == "atm") {
      this.listdata.atm.push(place);
    }
    if (place.types[0] == "bank") {
      this.listdata.bank.push(place);
    }
    // console.log(place);
    placeLoc = place.geometry.location;
    BriMap.marker[i] = new google.maps.Marker({
      map: BriMap.map,
      position: place.geometry.location,
      icon: image = {
        url: place.icon,
        scaledSize: new google.maps.Size(20, 20), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      }
    });
    k = parseFloat(geolib.getDistance(
      {latitude: this.lattitude, longitude: this.longitude},
      {latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()}
    ));
    BriMap.setContent[place.id] = place.name + "<br />" +
      place.formatted_address + "<br />" +
      "Jarak: " + (k >= 1000 ? parseFloat(k / 1000).toFixed(2) + " Km" : k + " m")
      ;
    google.maps.event.addListener(BriMap.marker[i], 'click', function () {
      BriMap.infowindow.setContent(BriMap.setContent[place.id]);
      BriMap.infowindow.open(BriMap.map, this);
    });
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
            BriMap.infowindow = new google.maps.InfoWindow();
            service = new google.maps.places.PlacesService(BriMap.map);
            // service.nearbySearch(request,
            service.textSearch({
              location: lokasinasabah,
              radius: '1000',
              language: "id",
              query: "'BANK BRI' 'ATM BRI'"
            },
              function (results, status) {
                console.log(status);
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                  // console.log(results);
                  for (var i = 0; i < results.length; i++) {
                    BriMap.createMarker(results[i], i);
                  }
                  for (g in BriMap.listdata.bank) {
                    $("#listmap")
                      .append("<h5>" + BriMap.listdata.bank[g].name + "</h5>"
                        + "<p>" + BriMap.listdata.bank[g].formatted_address + "</p>"
                        + "<p>Jarak: </p>"
                        + "<hr />");
                  }
                  for (g in BriMap.listdata.atm) {
                    $("#listmap")
                      .append("<h5>" + BriMap.listdata.atm[g].name + "</h5>"
                        + "<p>" + BriMap.listdata.atm[g].formatted_address + "</p>"
                        + "<p>Jarak: </p>"
                        + "<hr />");
                  }
                }
              }
            );
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
}

