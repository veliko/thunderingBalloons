var logout = function () {
  $.get('http://localhost:8080/logout')
      .done(function (data){
       console.log('successfully logged out');
    }).fail(function (error){
      console.error('Failed to logout!', error);
    });
}

var getEvents = function (callback) {
  //console.log('callback', callback);

  $.get('http://localhost:8080/events')
      .done(function (data){
       callback({eventsList: data, currentPage: '/myEvents'});
    }).fail(function (error){
      console.error('Failed to receive events!', error);
    });
}

var addEvents = function (callback) {
  callback({currentPage: '/addEvent'});
}

var postEvent = function (places, users) {
  var chosenPlace = $("input[type='radio'][name='chosenPlace']:checked").val();
  var place = places[chosenPlace];
  var date = $('#date').val();
  var time = $('#time').val();
  var what = $('#term').val();
  var invitees = [];

  var location = place.location.address[0];

  var timestamp = new Date(date+' '+ time);

  $('input[name="usersAddresses"]:checked').each(function() {
    var index = $(this).attr("value");
    invitees.push(users[index].id) ;
  });
  
  var query = {
    event_info: {
      event_name: what +' @ '+ place.name,
      venue_name: place.name,
      street: place.location.address[0],
      city: place.location.city,
      state: place.location.state_code,
      event_time: new Date('October 10, 2014 10:30:00'),
      latitude: place.location.coordinate.latitude,
      longitude: place.location.coordinate.longitude,
      phone: place.phone,
      rating: place.rating,
      rating_img: place.rating_img_url_small,
      image: place.image_url,
      yelp_link: place.url
    },
    invitees: invitees
  }
  $.post('http://localhost:8080/events', query)
    .done(function (data) {
      console.log('successfully created event.', data);
  }).fail(function (error){
    console.error('Failed to post an event!', error);
  });

}

var getUsers = function (callback) {

  $.get('http://localhost:8080/users')
      .done(function (data){
       callback({users: data});
    }).fail(function (error){
      console.error('Failed to receive users!', error);
    });
}

