/////////////////////
// messages router //
/////////////////////

// utility functions
var utils = require('../utils/utils');

// create express router 
var express = require('express');
var messagesRouter = express.Router();

// db helpers
var config = require('../db/config/config');
var env = config.development;
var Sequelize = require('sequelize');
var conString = env.dialect+'://'+env.username+':'+env.password+'@'+env.host+':'+env.port+'/'+env.database;
var sequelize = new Sequelize(conString, {
  dialect: 'postgres',
});

//db models
var Message = require('../db/models/message');


////////////////////
// route handling //
////////////////////

// main messages route
messagesRouter.route('/')
  .post(utils.checkUser, function(req, res){
    console.log("message body: ", req.body.message);
    return Message.create({
      uid: req.body.uid,
      eid: req.body.eid,
      message: req.body.message,
      createdAt: Date.now()
    }).then(function(storedMessage){
      res.send(200, storedMessage);
    });
  });

// get messaes for a specific event
messagesRouter.route('/:eid')
  .get(utils.checkUser, function(req, res){
    var query = "SELECT users.username, event_messages.message " + 
                "FROM event_messages, users " +
                "WHERE (event_messages.eid = " + req.params.eid + " AND event_messages.uid = users.id)";
    sequelize.query(query).spread(function(messages, metadata){
      if (messages) {
        res.send(200, messages);
      }
    });
  });


module.exports = messagesRouter;