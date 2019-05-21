//requre the dependencies
let express = require("express");
let expressHandlebars = require("express-handlebars");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

// set up port to the the host or 3000
let PORT = process.env.PORT || 3000;

// make my express app
var app = express();

//sets up express router
let router = express.Router();

// require the routes file for the router object
require("./config/routes")(router);

// makes public folder the static directory
app.use(express.static(__dirname + "/public"));

//connect handlebars to express app
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main"
  })
);

//use body parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// make every request go through the router middleware
app.use(router);

//database deployed or the local host database mongoHeadlines
let db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to the database
mongoose.connect(db, function(error) {
  //log the errors if there are any
  if (error) {
    console.log("oh nooo, there is an error");

    // if no errors log a success message
  } else {
    console.log("Suhweet mongoose connection successful");
  }
});

// listen on the port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT + "🌎");
});
