var Sequelize = require('sequelize');
var sequelize = ()

"use strict";

// module.exports = function(sequelize, DataTypes){
// 	var User = sequelize.define("User", {
// 		username: sequelize.STRING,
// 		password: sequelize.STRING,
// 	});
// }

	var User = sequelize.define("User", {
		username: sequelize.STRING,
		password: sequelize.STRING,
	});

module.exports = User;
