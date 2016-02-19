var auth = {
  consumerKey : "pVZYTtm4RMnrbJ-C07cM9Q",
  consumerSecret : "9CFLi9BwOCjb-3INZRMaZdfKjLI",
  accessToken : "6qa5ccd7oznhGcLHdO7aCUwzQydu8vna",
  accessTokenSecret : "ZRU5QpMFb6QL2ClE0WDT5hVCtZo",
  serviceProvider : {
    signatureMethod : "HMAC-SHA1"
  }
};

var searchYelp = function( keyword, latitude, longitude, callback ) {

  var terms = keyword;
  var lat = latitude;
  var lon = longitude;

  var accessor = {
    consumerSecret : auth.consumerSecret,
    tokenSecret : auth.accessTokenSecret
  };

  parameters = [];
  parameters.push(['term', terms]);
  parameters.push(['ll', lat+ ', ' + lon]);
  parameters.push(['callback', 'cb']);
  parameters.push(['oauth_consumer_key', auth.consumerKey]);
  parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  parameters.push(['oauth_token', auth.accessToken]);
  parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
  
  var message = {
      'action' : 'http://api.yelp.com/v2/search',
      'method' : 'GET',
      'parameters' : parameters
  };

  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);
  
  var parameterMap = OAuth.getParameterMap(message.parameters);
  
  $.ajax({
    'url' : message.action,
    'data' : parameterMap,
    'dataType' : 'jsonp',
    'jsonpCallback' : 'cb',
    success : function(data, textStats, XMLHttpRequest) {
        callback(data);
    }
  });
}

var getCenter = function( addresses ) {
  // addresses is an array of objects in the following form [{lat: 123, lon: -123}, ... ,]
  var sumLat = 0, sumLon = 0;
  var numOfAddresses = addresses.length;

  $.each(addresses, function(index, address) {
    sumLat += address['lat'];
    sumLon += address['lon'];
  });

  return {lat: sumLat/numOfAddresses, lon: sumLon/numOfAddresses};
}

