var BriStart = {
  bri_logo_width: 1,
  bri_logo_height: 1,
  init: function () {
    $(document).ready(function () {
      setTimeout(function () {
        $('#idsplash').slideUp('500');
        $('#idhome').slideDown('1000');
      }, 2000);
    })
  }
}.init();

