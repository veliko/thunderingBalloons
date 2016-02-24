function codeAddress(address, callback) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
     var lat = results[0].geometry.location.lat();
     var lng = results[0].geometry.location.lng();
     callback(lat, lng);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

window.codeAddress = codeAddress;