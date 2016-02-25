var config = require('../config/config');
var env = config.development;
var Sequelize = require('sequelize');
var sequelize = new Sequelize(env.dialect+'://'+env.username+':'+env.password+'@'+env.host+':'+env.port+'/'+env.database);

"use strict";

  // Date needs to be passed in the following timestamp format
  // Timestamp format : "2016-02-27 11:00:00 -0:00"
  // -0:00 indicates offset from current time zone. Please -0:00 for offset
  
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


