var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {
  // Load index page
  
  app.get("/user/profile", isAuthenticated, (request, response) => {
      response.render("Profile", {
        title: 'User Profile',
      });
  });
  
  app.get("/user/new", (request, response) => {
      response.render("createAccount", {
        title: 'New User',
      });
  });

  app.get("/calendar", isAuthenticated,(request, response) => {
    response.render("calendar", {
      title: "Calendar",
    });
  });

  app.get("/", (request, response) => {
    db.Dog
      .findAll({})
      .then((results) => {
        response.render("index", {
          title: 'Dogs Day Out',
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
