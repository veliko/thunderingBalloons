//////////////////
// login router //
//////////////////

// dependencies
var utils = require('../utils/utils');
var path = require('path');

// create express router 
var express = require('express');
var rootRouter = express.Router();


////////////////////
// route handling //
////////////////////

// main root route
rootRouter.route('/')
  .get(utils.checkUser, function(req, res) {
    res.sendfile(path.resolve('client/first.html')); 
});

// wildcard route
rootRouter.route('/*')
  .get(function(req, res){
    res.redirect('/');
  });


module.exports = rootRouter;
