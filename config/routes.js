let scrape = require("../scripts/scrape");

let headlinesController = require("../controllers/headlines");
let notesController = require("../controllers/notes");

module.exports = function(router) {
  // route for rendering the handlebars homepage
  router.get("/", function(req, resp) {
    resp.render("home.handlebars");
  });
  // renders the saved.handlebars page
  router.get("/saved", function(req, resp) {
    resp.render("saved.handlebars");
  });

  router.get("/api/fetch", function(rec, resp) {
    headlinesController.fetch(function(err, docs) {
      if (!docs || docs.insertedCount === 0) {
        resp.json({
          message: "No new Articles"
        });
      } else {
        resp.json({
          message: "Here are the " + docs.insertedCount + " new articles!"
        });
      }
    });
  });

  //grab headlines from database and get users request

  router.get("/api/headlines", function(req, resp) {
    let query = {};
    if (req.query.saved) {
      query = req.query;
    }
    headlinesController.get(query, function(data) {
      resp.json(data);
    });
  });

  router.delete("/api/headlines/:id", function(req, resp) {
    let query = {};
    query._id - req.params.id;
    headlinesController.delete(query, function(err, data) {
      resp.json(data);
    });
  });

  router.patch("/api/headlines", function(req, resp) {
    headlinesController.update(req.body, function(err, data) {
      resp.json(data);
    });
  });

  router.get("/api/notes/:headline_id?", function(req, resp) {
    let query = {};

    //if params are true then set query id to equal params user set
    if (req.params.headline_id) {
      query._id = req.params.headline_id;
    }
    //return data to front end
    notesController.get(query, function(err, data) {
      resp.json(data);
    });
  });

  router.delete("/api/notes/:id", function(req, resp) {
    let query = {};
    query._id = req.params.id;
    notesController.delete(query, function(err, data) {
      res.json(data);
    });
  });

  router.post("/api/notes", function(req, resp) {
    notesController.save(req.body, function(data) {
      res.json(data);
    });
  });
};
