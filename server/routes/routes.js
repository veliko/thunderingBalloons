var User = require('../models/user');
var config = require('../config/config');
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
      sequelize.sync().then(function(){
        User.findOne({
          where:{'uid':username}
        }).then(function(result){
          if (!result) {
            response.send(400, "<p>Invalid User</p>");
          }
          bcrypt.compare(password, result.dataValues.password, function(err, res) {
            if(res){
              console.log("matched!");
              response.send(200, "<p>Hello, Veliko</p>");
            }else{
              console.log("try again");
              response.send(400, "<p>Invalid User</p>")
            }
          });
        })
      });
    });


  ///////////////////////////
  // signup route handling //
  ///////////////////////////
  app.route('/signup')
    .get(function(req,res){
      res.render('../views/signup.ejs', {message:"Inside signup page"});
    })
    .post(function(req,res){
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(req.body.password, salt, function(err, hash){
          sequelize.sync().then(function(){
            return User.create({
              uid:req.body.username,
              password:hash,
              salt:salt,
              createdAt:Date.now()
            });
          }).then(function(result){
            console.log('posted to database.');
            res.json("Created new user...");
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
