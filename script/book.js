/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var BriBook = {
  book: function (parkingid, i) {
    $("#idmaps").slideUp(); // hide
    $("#idbook").slideDown(); // show
    $(".btn-tujuan").attr("href",
      "http://maps.google.com/maps?q=" + BriMap.places[i].name
      + ", " + BriMap.places[i].formatted_address);
    qrtext = "<p>Terima kasih "
      + store.get("email")
      + ", data book anda sudah kami proses. waktu expiry book parking anda pukul "
      + date("H:i:s", strtotime("+30 Minutes"))
      + "</p>"
      + "<p>Silahkan datang di <b>" + BriMap.places[i].name + "</b>, "
      + BriMap.places[i].formatted_address + "</p>";
    $("#bookdetail").html(qrtext);
    $("#divbook_qrcode").html("");
    $("#divbook_qrcode").attr("title", "");
    new QRCode("divbook_qrcode", {
      text: store.get("email") + ",parkir:" + rand(1111111, 99999999),
      width: 200,
      height: 200
    });
    JsBarcode("#divbook_barcode", rand(1111111, 99999999));
  },
  backmaps: function () {
    BriMap.init();
    $("#idbook").slideUp(); // hdie
    $('#idmaps').slideDown();
  },
  bookcs: function (cs, pid, i) {
    $("#idmaps").slideUp(); // hide
    $("#idbook").slideDown(); // show
    $(".btn-tujuan").attr("href",
      "http://maps.google.com/maps?q=" + BriMap.places[i].name
      + ", " + BriMap.places[i].formatted_address);
    qrtext = "<p>Terima kasih "
      + store.get("email")
      + ", data book anda sudah kami proses. waktu expiry book CS dan parking anda pukul "
      + date("H:i:s", strtotime("+30 Minutes"))
      + ", mohon datang sebelum waktu tersebut</p>"
      + "<p>Silahkan datang di <b>" + BriMap.places[i].name + "</b>, "
      + BriMap.places[i].formatted_address + ", Nomor antrian CS anda " + cs + "</p>";
    $("#bookdetail").html(qrtext);
    $("#divbook_qrcode").html("");
    $("#divbook_qrcode").attr("title", "");
    new QRCode("divbook_qrcode", {
      text: store.get("email") + ",parkir:" + rand(1111111, 99999999)
        + ",cs:" + cs
      ,
      width: 200,
      height: 200
    });
    JsBarcode("#divbook_barcode", rand(1111111, 99999999));
  }
}