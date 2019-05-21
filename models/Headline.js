// mongoose package
var mongoose = require("mongoose");

// schema with mongoose function
var Schema = mongoose.Schema;

//new schema that requires headline and summary
var headlineSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  date: String,
  saved: {
    type: Boolean,
    default: false
  }
});

// export Headline
var Headline = mongoose.model("Headline", headlineSchema);
module.exports = Headline;
