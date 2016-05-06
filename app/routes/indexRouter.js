var express = require("express");
var router = express.Router();
var path = require("path");

var viewPath = "app/public/views/";

router.get("/", function(req, res){
  res.sendFile( path.resolve( viewPath + "/index.html") );
});


module.exports = router;
