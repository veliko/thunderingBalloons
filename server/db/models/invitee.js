var config = require('../config/config');
var env = config.development;
var Sequelize = require('sequelize');
var sequelize = new Sequelize(env.dialect+'://'+env.username+':'+env.password+'@'+env.host+':'+env.port+'/'+env.database);

"use strict";

  var Invitee = sequelize.define('invitee',
  {
    uid : Sequelize.INTEGER,
    eid : Sequelize.INTEGER,
    current_status : {
      type: Sequelize.ENUM,
      values: ['pending', 'accepted', 'rejected']
    }
  });

  module.exports = Invitee;