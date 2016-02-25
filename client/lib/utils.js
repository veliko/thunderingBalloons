var signup = function (callback) {
	var username = $('#signup-username').val();
	var password = $('#signup-password').val();
	var address = $('#signup-address').val();

	codeAddress(address, function(lat, lng){
    var query = {username:username, password:password, latitude:lat, longitude:lng};
    $.post('http://localhost:8080/signup', query)
      .done(function (data){
        console.log('successful signup', data);
        window.localStorage.setItem('session', data);
        callback({currentPage: '/'});
    }).fail(function (error){
      console.error('Failed to create user!', error);
    });
  });
}

var login = function (callback) {
  var username = $('#login-username').val();
  var password = $('#login-password').val();

  var query = {username:username, password:password};
  $.post('http://localhost:8080/login', query)
    .done(function (data){
      console.log('successful signup', data);
      window.localStorage.setItem('session', data);
      callback({currentPage: '/'});
  }).fail(function (error){
    console.error('Failed to login user!', error);
  });
}

