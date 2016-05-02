var express     = require("express");
var app         = express();

// system configuration
var morgan      = require("morgan");
var port        = 3000;
var mongoose    = require("mongoose");
var config      = require("./app/config/config");
var bodyParser  = require("body-parser");

// routers
var indexRouter = require("./app/routes/index");
var usersRouter = require("./app/routes/users");

mongoose.connect( config.database);


// set static routes
app.use( express.static("./app/public"));
// set some logging middleware
app.use( morgan("dev") );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", indexRouter );
app.use("/api/users", usersRouter );

//tell app to listen on port
app.listen( port, function(){
  console.log("Starting super awesome auth server");
});

