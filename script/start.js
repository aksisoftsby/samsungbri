var BriStart = {
  bri_logo_width: 1,
  bri_logo_height: 1,
  init: function () {
    $(document).ready(function () {
      setTimeout(function () {
        $('#idsplash').slideUp();
        if (store.isSet("email")) {
          // BriMap.init();
          // $('#idmaps').slideDown('1000');
        } else {
          // $('#idhome').slideDown('1000');
        }
        $('#idhome').slideDown();
      }, 2000);
    })
  }
}.init();

