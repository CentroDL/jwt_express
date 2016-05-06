var User = require("../models/user");
var passport = require("passport");
var configFile = require("./config.js");
var JwtStrategy = require("passport-jwt").Strategy;
// var ExtractJwt = require("passport-jwt").ExtractJwt;

var LocalStrategy = require("passport-local")

// verifies username & password for us
passport.use( new LocalStrategy(
  function( username, password, done ) {
    User.findOne({ username: username }, function( err, dbUser ) {
      if (err) { return done(err); }

      if (!dbUser) {
        'Incorrect username.'
        return done(null, false);
      }

      if (!dbUser.authenticate(password)) {
        // 'Incorrect password.'
        return done(null, false);
      }

      return done(null, dbUser);
    });
  })
);





// configuration options for extracting/handling our JWT
var options = {};

options.secretOrKey    = configFile.secret;
options.jwtFromRequest = function(req){
  var token = null;
  // you'll need cookie-parser since we're extracting from cookies
  if( req && req.cookies){
    token = req.cookies["jwt_token"];
  }

  // this doesnt work in theory due to the lack of multi part request body support
  // if( req && req.body.jwt_token){
  //   token = req.body.jwt_token;
  // }

  return token;
};

var verify = function( jwtPayload, done){
  // find the user based on the "subject" property of the jwtPayload Object
  User.findOne({ id: jwtPayload.sub }, function(err, user){
      if(err){
        return done(err, false);
      } else if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
  });
};

passport.use( new JwtStrategy(options, verify) );


module.exports = passport;







