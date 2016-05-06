var express     = require("express");
var loginRouter = express.Router();
var passport    = require("passport");
var jwt         = require("jsonwebtoken");
var jwtConfig   = require("../config/config.js");

loginRouter.use( passport.initialize() );


loginRouter.post("/", passport.authenticate("local", { session: false }), function(req, res){
  //create token
  var token = jwt.sign(         req.user,
                        jwtConfig.secret,
                        { expiresIn: 600 }
                      );
  //send it back to the user
  res.json({ token: token });

});

module.exports = loginRouter;
