var auth = {
    //
    // Update with your auth tokens.
    //
    consumerKey : "pVZYTtm4RMnrbJ-C07cM9Q",
    consumerSecret : "9CFLi9BwOCjb-3INZRMaZdfKjLI",
    accessToken : "6qa5ccd7oznhGcLHdO7aCUwzQydu8vna",
    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
    // You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret : "ZRU5QpMFb6QL2ClE0WDT5hVCtZo",
    serviceProvider : {
        signatureMethod : "HMAC-SHA1"
    }
};

var searchYelp = function(keyword, latitude, longitude, callback){

  console.log("Auth: ", auth);
  var terms = keyword;
  var lat = latitude;//37.7833;
  var lon = longitude;//-122.4167;//'San+Francisco';

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
  //console.log(parameterMap);
  
  $.ajax({
      'url' : message.action,
      'data' : parameterMap,
      'dataType' : 'jsonp',
      'jsonpCallback' : 'cb',
      'success' : function(data, textStats, XMLHttpRequest) {
          //console.log(callback);
          //$("body").append(output);
          callback(data);
      }
  });
}

