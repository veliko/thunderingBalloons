var config = require('../config/config');
var env = config.development;
var Sequelize = require('sequelize');
var sequelize = new Sequelize(env.dialect+'://'+env.username+':'+env.password+'@'+env.host+':'+env.port+'/'+env.database);

"use strict";

	var User = sequelize.define('user',
	{
	  username: Sequelize.STRING,
    hash: Sequelize.STRING,
    email: Sequelize.STRING,
    latitude: Sequelize.STRING,
    longitude: Sequelize.STRING,
	});

	module.exports = User;
