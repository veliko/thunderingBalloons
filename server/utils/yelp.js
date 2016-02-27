//OAUTH modules for yelp api
var Yelp = require('yelp');

var auth = {
  consumerKey : "pVZYTtm4RMnrbJ-C07cM9Q",
  consumerSecret : "9CFLi9BwOCjb-3INZRMaZdfKjLI",
  accessToken : "6qa5ccd7oznhGcLHdO7aCUwzQydu8vna",
  accessTokenSecret : "ZRU5QpMFb6QL2ClE0WDT5hVCtZo",
  serviceProvider : {
    signatureMethod : "HMAC-SHA1"
  }
};

var yelp = new Yelp({
  consumer_key: auth.consumerKey,
  consumer_secret: auth.consumerSecret,
  token: auth.accessToken,
  token_secret: auth.accessTokenSecret,
});

var searchYelp = function( keyword, latitude, longitude, callback ) {

  yelp.search({ term: keyword, ll: latitude+','+ longitude})
    .then(function (data) {
      if(callback){
        callback(data);
      }
    }).catch(function (err) {
      console.error('Search Yelp Error: ', err);
    });
 
}


module.exports = searchYelp;
