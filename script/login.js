var BriLogin = {
  validateEmail: function () {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.email);
  },
  email: "",
}
$("#btnlogin").click(function () {
  BriLogin.email = $("#inputemail").val().trim().toLowerCase();
  if (BriLogin.validateEmail()) {
    // return false;
    $("#idhome").slideUp(); // hide
    // store database
    store.set("email", BriLogin.email);
    // show maps
    $("#idmaps").slideDown();
    BriMap.init();
  }
  return false;
});
