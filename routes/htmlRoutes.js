var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

var userID;

module.exports = function(app) {
  app.get("/calendar", isAuthenticated, (request, response) => {
    response.render("calendar", {
      title: "Calendar"
    });
  });

  app.get("/day/:date", isAuthenticated, (request, response) => {
    db.Event
      .count({
        where: {
          date: request.params.date,
        },
      })
      .then((count) => {
        if (count > 0) {
          response.render("day", {
            title: "Day",
            dayDate: request.params.date,
          });
        } else {
          response.render("404");
        }
      });
  });

  app.get("/event", (request, response) => {
    response.render("event", {
      title: "Event"
    });
  });

  app.get("/user/profile", isAuthenticated, (request, response, next) => {
      response.render("profile", {
        title: "User Profile",
    });
  });

  app.get("/user/new", (request, response) => {
    response.render("createAccount", {
      title: "New User"
    });
  });

  app.get("/seeds", (request, response) => {
    response.render("seeds", {title: "Seed page"})
  })

  app.get("/", (request, response) => {

    response.render("index", {
      title: "Dogs Day Out",
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (request, response) => {
    response.render("404");
  });
};
