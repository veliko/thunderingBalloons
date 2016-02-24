var config = require('../config/config');
var env = config.development;
var Sequelize = require('sequelize');
var sequelize = new Sequelize(env.dialect+'://'+env.username+':'+env.password+'@'+env.host+':'+env.port+'/'+env.database);

"use strict";

  var Event = sequelize.define('event',
  {
    event_name : Sequelize.STRING,
    org_id : Sequelize.INTEGER,
    venue_name : Sequelize.STRING,
    street : Sequelize.STRING,
    city : Sequelize.STRING,
    state : Sequelize.STRING,
    phone : Sequelize.STRING,
    event_time : Sequelize.DATE,
    rating : Sequelize.FLOAT,
    rating_img : Sequelize.STRING,
    image : Sequelize.STRING,
    yelp_link : Sequelize.STRING,
    latitude: Sequelize.FLOAT,
    longitude: Sequelize.FLOAT
  });

  module.exports = Event;

// {
//   "event_info": {
//     "event_name": "coffee meeting",
//     "org_id": 1,
//     "venue_name": "Peets Coffee Sausalito",
//     "street": "123 Main St",
//     "city": "Sausalito",
//     "state": "CA",
//     "event_time": "2016-02-27",
//     "latitude": 37.7832,
//     "longitude": -122.4082,
//     "phone": "650-238-8267",
//     "rating": 4.5,
//     "rating_img": "www.google.com",
//     "image": "www.best.com",
//     "yelp_link": "www.yelp.com"
//   },
//   "invitees": [
//     1,
//     2
//   ]
// }