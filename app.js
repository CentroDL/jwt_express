var express     = require("express");
var app         = express();
var morgan      = require("morgan");
var port        = 3000;
var mongoose    = require("mongoose");
var config      = require("./app/config/config")
var indexRouter = require("./app/routes/index");

mongoose.connect( config.database);


// set static routes
app.use( express.static("./app/public"));
// set some logging middleware
app.use( morgan("dev") );

app.use("/", indexRouter );

//tell app to listen on port
app.listen( port, function(){
  console.log("Starting super awesome auth server");
});

