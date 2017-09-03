new google.maps.places.PlacesService(
  new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(BriMap.lattitude, BriMap.longitude),
    zoom: 14
  }))
  .textSearch({
    location: new google.maps.LatLng(BriMap.lattitude, BriMap.longitude),
    radius: '1000',
    language: "id",
    query: "'BANK BRI' or 'ATM BRI'"
  },
    function (results, status) {
      console.log(status);
      console.log(results);
    }
  );