var searchPlaces = function (options, callback) {
  var term = $('#term').val();
  var address = $('#address').val();

  codeAddress(address, function(lat, lng){
    var query = {lat:lat, lng:lng, term:term};
    $.get('/places', query)
      .done(function (data){
        console.log('successfully YELP get', data);
        callback({placesList: data.businesses});
    }).fail(function (error){
      console.error('Yelp: Failed to receive places!', error);
    });
  });
};