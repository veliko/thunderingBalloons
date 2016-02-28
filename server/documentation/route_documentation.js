//////////////////////////////////////////////////////////
//                                                      // 
//   api routes listing for thunderingballoons server   //
//                                                      // 
//////////////////////////////////////////////////////////


// This file is for documentation purposes only.
// It only is meant to be an api reference resource.
// No parts of this file are used as programming logic.
// The contents are listed as JSON object purely for visual clarity.
// -----------------------------------------------------//
// Below are all the api routes currently implemented:


// "/",  "/logout", "/*"
// "/signup"
// "/login"
// "/users"
// "/invite"
// "/events"
// "/messages"
// "/places"


{
  "GET /" : {
    "desc": "returns client home page if a user is signed in",
    "auth protected": true,
    "response": "client homepage along with all static assets needed",  
    "resopnse data": "html"
  },

  "GET /logout": {
    "desc": "destroys current client session and redirects to login screen",
    "auth protected": false,
    "response": "redirect to /login route", 
    "response data": "redirect"
  },

  "GET /*": {
    "desc": "wildcard route to catch any unhandled apis calls, routes back to root root directory",
    "auth protected": false,
    "response": "redirect to / route",
    "response data": "redirect"
  },

  "GET /signup": {
    "desc": "sends 'signup' ejs template to client which handles new account creation",
    "auth protected": false,
    "response": "'signup' ejs template",
    "response data": "ejs template"
  }, 

  "POST /signup": {
    "desc": "create new user account using data entered into 'signup' ejs page",
    "expected request body data": {
      "username" : "john",
      "password" : "123",
      "email" : "john@abc.com",
      "latitude" : 37.1234,
      "longitude" : 122.1234 
    },
    "auth protected": false,
    "response": "redirect to /login route to log in with newly created account",
    "response data": "redirect"
  },

  "GET /signup/users/:username": {
    "desc": "helper api route to determine if a specific username already exists",
    "expected request api format": "/signup/users/john"
    "auth protected": false,
    "response": "returns true or false",
    "response data": true
  }, 

  "GET /login": {
    "desc": "sends 'login' ejs template to client which handles new account creation",
    "auth protected": false,
    "response": "'login' ejs template",
    "response data": "ejs template"
  }, 

  "POST /login": {
    "desc": "use provided data from 'login' form to authenticate user, create session and redirect to homepage",
    "expected request body data": {
      "username" : "john",
      "password" : "123"
    },
    "auth protected": false,
    "response": "depending if user/pass matches, redirect to homepage or back to /login",
    "response data": "redirect"
  },  

  "GET /users": {
    "desc": "sends back JSON array of all current users and their home address lat/lon coordinates",
    "auth protected": true,
    "response": "JSON array",
    "response data": [ {
      "username": "John",
      "lat": 123,
      "lon": 123
    }, {/* another user */}, {/* another user */} ]
  },

  "PUT /invite": {
    "desc": "update invite status for a specific user at a specific event",
    "auth protected": true,
    "expected request body data": {
      // do not worry about supplying a user id
      // the specific user id is determined server side based on the current session
      "eid": 2, // event id for which to update invite status
      "status" : "accepted" // other two possible values are "pending" or "rejected"
    },
    "response": "200, Invite updated",
    "response data": "string"
  },

  "GET /events": {
    "desc": "sends back JSON array of all the events current user is invited to",
    "auth protected": true,
    "expected request body data": "", // no data expected, server knows user id from session info
    "response": "JSON array",
    "response data": [ {
      "id": 1, // this is the event id
      "uid": 1, // user id of current user
      "eid": 1, // this is also the event id
      "current_status": "pending",
      "createdAt": "2016-02-24T00:00:00.000Z",
      "updatedAt": "2016-02-24T00:00:00.000Z",
      "event_name": "Business coffee meeting",
      "org_id": 2, // if of the event organizer
      "venue_name": "Peets Coffee Sausalito",
      "neighborhood": null,
      "street": "123 Main St",
      "city": "Sausalito",
      "state": "CA",
      "event_time": "2016-02-28T02:00:00.000Z",
      "latitude": 37.7832,
      "longitude": -122.4082,
      "phone": "650-238-8267",
      "rating": 4.5,
      "rating_img": "http://www.yelp.com/rating_img.jpg", // link to yelp star rating image
      "image": "http://www.yelp.com/rating_img.jpg", // link to business yelp image
      "yelp_link": "http://www.yelp.com/business", // link to business yelp page
      "attendees": [ // list of all event attendees
          {
            "username": "griffin"
          },
          {
            "username": "jake"
          }
        ]
    }, {/* another event */}, {/* another user */} ]
  },

  "POST /events": {
    "desc": "write new event information to to database",
    "auth protected": true,
    "expected request body data": {
      "event_info" : {
        "event_name" : "Business coffee meeting",
        "org_id" : 1, // the id of the organizer
        "venue_name" : "Peets Coffee Sausalito",
        "street" : "123 Main St",
        "city" : "Sausalito",
        "state" : "CA",
        "event_time" : "2016-02-27",
        "latitude" : 37.7832,
        "longitude" : -122.4082,
        "phone" : "650-238-8267",
        "rating" : 4.5,
        "rating_img" : "www.google.com",
        "image" : "www.best.com",
        "yelp_link" : "www.yelp.com"
      },
      "invitees" : [1,2] // user id-s of all invited users
    },
    "response": "200, Event created, wrote all invitees to db", 
    "response data": "string"
  },

  "GET /messages/:eid": {
    "desc": "get all messages from database for a specific event id",
    "auth proteted": true,
    "expected request api format": "/events/3", // request all messages for event, the id of which is 3
    "response": "JSON array", 
    "response data": [
        {
          "username": "arnold",
          "message": "I love coffee"
        },
        {
          "username": "john",
          "message": "Give me CSS"
        }
      ]
  },

  "POST /messages": {
    "desc": "post a message to the board of a specific event",
    "auth protected": true,
    "expected request body format": {
      "uid": 1, // user id 
      "eid": 2, // event id
      "message": "Sample message text"
    },
    "response": "JSON representation of stored message",
    "response data": {
      "id": 20, // unique message id from messages table 
      "uid": 4, // user id
      "eid": 1, // event id
      "message": "test message 1234123412341234",
      "createdAt": "2016-02-28T00:00:00.000Z", // timestamp of message creation
      "updatedAt": "2016-02-28T00:00:00.000Z"  
    } 
  }
}
