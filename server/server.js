///////////////////////////////////////////////
//                                           //
//   Server for thunderingBalloons project   //
//                                           //
///////////////////////////////////////////////


//////////////////
// Dependencies //
//////////////////
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var session = require('express-session');
var methodOverride = require('method-override');
var config = require('./db/config/config');
var env = config.development;


//////////////////////////
// Apply modules to app //
//////////////////////////
app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// app.use(session);

// app.post('/signup', function(req, res){
//   console.log("got new request: ", req.body);
//   res.send(200, "OK");
// });

require('./routes/routes.js')(app);

app.set('view engine','ejs');
app.listen(port);

console.log("App started on port:",port);
exports = module.exports = app;
