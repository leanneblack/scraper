// mongoose package
var mongoose = require("mongoose");

// schema with mongoose method to create schema
var noteSchema = mongoose.Schema;

//new schema that requires that has headline id--for article
var headlineSchema = new Schema({
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },
  date: String,
  noteText: String
});

// export note model
var Note = mongoose.model("Note", noteSchema);
module.exports = Note;
