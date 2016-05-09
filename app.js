var express     = require("express");
var app         = express();

// system configuration
var morgan       = require("morgan");
var port         = 3000;
var mongoose     = require("mongoose");
var config       = require("./app/config/config");
var bodyParser   = require("body-parser");
var cookieParser = require("cookie-parser");

// routers
var indexRouter = require("./app/routes/indexRouter");
var usersRouter = require("./app/routes/usersRouter");
var loginRouter = require("./app/routes/loginRouter");

mongoose.connect( process.env.MONGODB_URI || config.database);


// set static routes
app.use( express.static("./app/public"));
// set some logging middleware
app.use( morgan("dev") );

// set request parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//routing
app.use("/", indexRouter );
app.use("/login", loginRouter )
app.use("/api/users", usersRouter );

//tell app to listen on port
app.listen( port, function(){
  console.log("Starting super awesome auth server");
});

