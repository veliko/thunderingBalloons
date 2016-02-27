///////////////////
// invite router //
///////////////////

// utility functions
var utils = require('../utils/utils');

// create express router 
var express = require('express');
var inviteRouter = express.Router(); 

// db helpers
var config = require('../db/config/config');
var env = config.development;
var Sequelize = require('sequelize');
var conString = env.dialect+'://'+env.username+':'+env.password+'@'+env.host+':'+env.port+'/'+env.database;
var sequelize = new Sequelize(conString, {
  dialect: 'postgres',
});


////////////////////
// route handling //
////////////////////

// main invite route
inviteRouter.route('/')
  .put(utils.checkUser, function(req, res) {
    var uid = req.session.uid;
    var eid = req.body.eid;
    var status = req.body.status;

    var query = "UPDATE invitees SET current_status = '" + status + "' WHERE (uid = " + uid + " and eid = " + eid + ")";
    sequelize.query(query).spread(function(updated, metadata){
      if (updated) {
        res.send(200, "Invite updated")
      }
    }).catch(utils.handleError(req, res, 500, "Error while updating invitee information in database."));
  });


module.exports = inviteRouter;