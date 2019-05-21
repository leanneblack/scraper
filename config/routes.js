module.exports = function(router) {
  // route for rendering the handlebars homepage
  router.get("/", function(req, resp) {
    resp.render("home.handlebars");
  });
  // renders the saved.handlebars page
  router.get("/saved", function(req, resp) {
    resp.render("saved.handlebars");
  });
};
