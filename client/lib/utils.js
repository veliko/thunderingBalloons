var signup = function () {
	var username = $('#signup-username').val();
	var password = $('#signup-password').val();
	var address = $('#signup-address').val();

	codeAddress(address, function(lat, lng){
    var query = {username:username, password:password, latitude:lat, longitude:lng};
    $.post('http://localhost:8080/signup', query)
      .done(function (data, req, res, body){
        console.log('successful signup', data);
        console.log('req',req);
        window.localStorage.setItem('session', data);
        console.log('res',res);
        console.log('body',body);
    }).fail(function (error){
      console.error('Failed to create user!', error);
    });
  });
}