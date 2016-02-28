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
var session = require('express-session');
var methodOverride = require('method-override');
var config = require('./db/config/config');
var env = config.development;


////////////////////
// router modules //
////////////////////

// "/",  "/logout", "/*"
var rootRouter = require('./routes/router_root');
// "/signup"
var signupRouter = require('./routes/router_signup');
// "/login"
var loginRouter = require('./routes/router_login');
// "/users"
var usersRouter = require('./routes/router_users');
// "/invite"
var inviteRouter = require('./routes/router_invite');
// "/events"
var eventsRouter = require('./routes/router_events');
// "/messages"
var messagesRouter = require('./routes/router_messages');
// "/places"
var placesRouter = require('./routes/router_places');


////////////////////////////////////////////////
// Apply global middleware and view templates //
////////////////////////////////////////////////

app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  secret: "TestSecret", 
  resave: false,
  saveUninitialized: true
}));

///////////////////////////////
// Route handling middleware //
///////////////////////////////

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/messages', messagesRouter);
app.use('/places', placesRouter);
app.use('/invite', inviteRouter);
app.use('/', rootRouter);


app.listen(port);

console.log("App started on port:",port);
exports = module.exports = app;
