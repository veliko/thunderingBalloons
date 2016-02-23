var User = require('../db/models/user');
var config = require('../db/config/config');
var env = config.development;
var flash = require('connect-flash');
var bcrypt = require('bcrypt');

// db modules
var Sequelize = require('sequelize');
var conString = env.dialect+'://'+env.username+':'+env.password+'@'+env.host+':'+env.port+'/'+env.database;
var sequelize = new Sequelize(conString, {
  dialect: 'postgres',
});


/////////////////////////////////////////////////////
// configure endpoints //////////////////////////////
/////////////////////////////////////////////////////
module.exports = function(app){


  /////////////////////////
  // root route handling //
  /////////////////////////
  app.route('/')
    .get(function(req,res){
      res.render('../views/index.ejs');
    })
    .post(function(req,res){
      var id = req.body.id;
      sequelize.sync().then(function(){
        return User.findAll({
          where:{'id':id}
        });
      }).then(function(result){
        console.log('fetched from database: ',result);
        res.json(result);
      });
    });


  //////////////////////////
  // login route handling //
  //////////////////////////
  app.route('/login')
    .get(function(req,res){
      res.render('../views/login.ejs', {message:"Enter username and password"});
    })
    .post(function(req,response){
      var username = req.body.username;
      var password = req.body.password;
      //fetch hashedpassword and salt for entered username
      sequelize.sync().then(function() {
        User.findOne({
          where:{'username':username}
        })
        .then(function(matchedUser){
          if (!matchedUser) {
          response.send(400, "Invalid User");
          }
          bcrypt.compare(password, matchedUser.dataValues.hash, function(err, match) {
            if (match) {
              // return an an array with users and location
              console.log("matched!");
              User.findAll({
                attributes: ["username", "latitude", "longitude"]
              }).then(function(allUsers){
                response.send(200, allUsers);
              });
            } else {
              console.log("try again");
              response.send(400, "pass does not match")
            }
          });
        })
      });
    });


  ///////////////////////////
  // signup route handling //
  ///////////////////////////

  // extra route to see if chosen user name exists
  app.route('/signup/users/:username')
    .get(function(req, res){
      sequelize.sync().then(function() {
        User.findOne({
          where:{'username': req.params.username}
        }).then(function(result){
          res.send(200, result ? true : false);
        });
      });
    });

  // main signup route logic  
  app.route('/signup')
    .get(function(req,res){
      res.render('../views/signup.ejs', {message:"Inside signup page"});
    })
    .post(function(req,res){
      bcrypt.genSalt(10, function(err, salt){
        console.log("salt: ", salt, "\nuser: ", req.body.username);
        console.log("request looks like this: ", req.body);
        bcrypt.hash(req.body.password, salt, function(err, hash){
          sequelize.sync().then(function(){
            return User.create({
              username: req.body.username,
              hash: hash,
              email: req.body.email,
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              createdAt: Date.now()
            });
          }).then(function(result){
            console.log('posted to database.');
            res.send(200, "Created new user...");
          })
        })
      });
    });


  ///////////////////////////
  // get request from yelp //
  ///////////////////////////
  app.route('/places')
    .get(function(req, res) {
     /* TODO: might need to change the request's data object */
     var term = req.headers.data.term;
     var lat = req.headers.data.lat;
     var lon = req.headers.data.lon;
     searchYelp(term, lat, lon, function(data){
       res.json(data);
     });
    });

};
