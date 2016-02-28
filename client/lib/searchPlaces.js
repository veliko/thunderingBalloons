var searchPlaces = function (callback, users) {
  var term = $('#term').val();
  
  var latitude = 0;
  var longitude = 0;
  var count = 0;

  $('input[name="usersAddresses"]:checked').each(function() {
    var index =  $(this).attr("value");
    latitude += users[index].latitude;
    longitude += users[index].longitude;
    count++;
  });

  console.log('latitude:', latitude, 'longitude:', longitude, 'count:', count);

  var query = {lat:latitude/count, lng:longitude/count, term:term};
  $.get('/places', query)
    .done(function (data){
      console.log('successfully YELP get', data);
      callback({placesList: data.businesses});
  }).fail(function (error){
    console.error('Yelp: Failed to receive places!', error);
  });
};