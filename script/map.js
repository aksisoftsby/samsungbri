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
  places: {},
  listdata: {
    me: [],
    bank: [],
    atm: []
  },
  createMarker: function (place, i) {
    // console.log(place);
    if (place.types[0] == "atm") {
      this.listdata.atm[i] = place;
    }
    if (place.types[0] == "bank") {
      this.listdata.bank[i] = place;
    }
    this.places[i] = place;
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
    cs = rand(1, 50);
    par = rand(1, 2);
    BriMap.setContent[place.id] = '<h5>' + place.name + '</h5>'
      + place.formatted_address + "<br />" +
      "Jarak: " + (k >= 1000 ? parseFloat(k / 1000).toFixed(2) + " Km" : k + " m")
      + '<br />'
      + (
        place.types[0] == "atm"
        ? "Parkir ATM tersedia" :
        (
          date("H") > 23
          ? "Bank sudah tutup, silahkan cek kembali senin-jumat pukul 08:00 - 15:00"
          : "Antrian Customer Services: " + cs + " "
          + "estimasi Pukul " + date("H:i:s", strtotime("+1 Hour")) + ", "
          + "Parkir mobil lantai " + par + " tersedia, " + rand(2, 6) + " slot tersedia."
          + "<br />"
          + 'Book expiry ' + date("H:i:s", strtotime("+15 Minutes"))
          + "<br />"
          + "<a onclick='BriBook.bookcs(" + cs + "," + par + ", " + i + ")' class='btn btn-primary btn-sm'>book CS and parking</a> | "
          + "<a onclick='BriBook.book(" + par + ", " + i + ")' "
          + "class='btn btn-success btn-sm'>book parking</a>")
        )
      ;
    google.maps.event.addListener(BriMap.marker[i], 'click', function () {
      BriMap.clickmarker(i, place.id);
    });
  },
  clickmarker: function (i, id) {
    BriMap.infowindow.setContent(BriMap.setContent[id]);
    BriMap.infowindow.open(BriMap.map, BriMap.marker[i]);
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
                      .append("<div onclick='BriMap.clickmarker(" + g + ", " + '"' + BriMap.listdata.bank[g].id + '"' + ");'>"
                        + BriMap.setContent[BriMap.listdata.bank[g].id]
                        + "<div>");
                  }
                  for (g in BriMap.listdata.atm) {
                    $("#listmap")
                      .append("<div onclick='BriMap.clickmarker(" + g + ", " + '"' + BriMap.listdata.atm[g].id + '"' + ");'>"
                        + BriMap.setContent[BriMap.listdata.atm[g].id]
                        + "<div>");
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
    }
  ,
}

