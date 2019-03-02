var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", (request, response) => {
    db.Dog
      .findAll()
      .then((results) => {
        response.render("index", {
          msg: "Welcome!",
          dogs: results,
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (request, response) => {
    response.render("404");
  });
};