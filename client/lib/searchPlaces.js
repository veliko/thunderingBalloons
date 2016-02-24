var searchPlaces = (options, callback) => {
  var term = $('#term').val();
  var address = $('#address').val();

  codeAddress(address, function(lat, lng){
    var query = {lat:lat, lng:lng, term:term};
    $.get('http://localhost:8080/places', query)
      .done(function (data){
        callback(data);
    }).fail(function (error){
      console.error('Yelp: Failed to receive places!', error);
    });
  });
};

window.searchPlaces = searchPlaces;