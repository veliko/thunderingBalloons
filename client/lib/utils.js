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
       console.log('successful events', JSON.stringify(data));
       callback({eventsList: data, currentPage: '/myEvents'});
    }).fail(function (error){
      console.error('Failed to receive events!', error);
    });
}

var addEvents = function () {

}
