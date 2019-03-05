var db = require("../models");

module.exports = function(app) {
  app.get("/calendar", (request, response) => {
    response.render("calendar", {
      title: "Calendar",
    });
  });

  app.get("/day", (request, response) => {
    response.render("day", {
      title: "Day",
    });
  });

  app.get("/user/profile", (request, response) => {
      response.render("Profile", {
        title: "User Profile",
      });
  });
  
  app.get("/user/new", (request, response) => {
      response.render("setup", {
        title: "New User",
      });
  });

  // Load index page
  app.get("/", (request, response) => {
    db.Dog
      .findAll({})
      .then((results) => {
        response.render("index", {
          title: "Dogs Day Out",
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
