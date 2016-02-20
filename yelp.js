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
    //console.log(data);
    if(callback){
      callback(data);
    }
  })
  .catch(function (err) {
    console.error('search Yelp Error: ', err);
});
 
}

// var getCenter = function( addresses ) {
//   // addresses is an array of objects in the following form [{lat: 123, lon: -123}, ... ,]
//   var sumLat = 0, sumLon = 0;
//   var numOfAddresses = addresses.length;

//   $.each(addresses, function(index, address) {
//     sumLat += address['lat'];
//     sumLon += address['lon'];
//   });

//   return {lat: sumLat/numOfAddresses, lon: sumLon/numOfAddresses};
// }

module.exports = searchYelp;
