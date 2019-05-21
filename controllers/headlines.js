let scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

let Headline = require("../models/Headline");

module.exports = {
  fetch: function(cb) {
    ///run scrape to set data to articles and go through each to make a date and insert it and set saved to false so user can save it themselves

    scrape(function(data) {
      let articles = data;
      for (var i = 0; i < articles.length; i++) {
        articles[i].date = makeDate();
        articles[i].saved = false;
      }
      //run mongo function to take headline and insert articles
      Headline.collection.insertMany(articles, { ordered: false }, function(
        err,
        docs
      ) {
        cb(err, docs);
      });
    });
  },

  delete: function(query, cb) {
    Headline.remove(query, cb);
  },

  get: function(query, cb) {
    Headline.find(query)
      // most recent to lease recent
      .sort({
        _id: -1
      })
      //pass documents
      .exec(function(err, doc) {
        cb(doc);
      });
  },
  update: function(query, cb) {
    Headline.update(
      { _id: query._id },
      {
        $set: query
      },
      {},
      cb
    );
  }
};
