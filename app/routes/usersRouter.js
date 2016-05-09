var express = require("express");
var usersRouter  = express.Router();

var User     = require("../models/user");
var passport = require("../config/passport");


usersRouter.post("/", function(req, res){
  User.create( req.body.user, function(err, dbUser){
    if(err){ return res.status(500).json(err); }
    // if(err){ console.log(err); }

    res.json(dbUser);

  });
}); // post

// this registers the passport jwt strategy to fire before all subsequent routes in this file
usersRouter.use( passport.authenticate("jwt", { session: false }) );

// api/users
usersRouter.get("/", function(req, res){
  res.json({message: "hello"});
});


module.exports = usersRouter;

