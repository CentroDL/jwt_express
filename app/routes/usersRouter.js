var express = require("express");
var router  = express.Router();

var User     = require("../models/user");
var passport = require("passport");

router.get("/", function(req, res){
  res.json({message: "hello"});
});


router.post("/", function(req, res){
  console.log( req.body.user );

  User.create( req.body.user, function(err, dbUser){
    if(err){ return res.status(500).json(err); }
    // if(err){ console.log(err); }

    res.json(dbUser);
  });
}); // post


module.exports = router;

