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
    db.Park
      .findAll({
        include: [
          {
            model: db.Event,
            where: {
              date: request.params.date,
            },
            required: false,
          },
        ],
        order: [
          ["name", "ASC"],
        ],
      })
      .then((parks) => {
        if (parks.length > 0) {
          parks = formatParksForHandlebars(parks);
          const date = formatDate(request.params.date);

          response.render("day", {
            title: date,
            parks: parks,
            parksJson: JSON.stringify(parks),
          });
        } else {
          response.status(404).render("404");
        }
      });
  });

  app.get("/event/:id?", isAuthenticated, (request, response) => {
    response.render("event", {
      title: "Event",
    });
  });

  app.get("/user/profile", isAuthenticated, (request, response, next) => {
      response.render("profile", {
        title: "User Profile",
    });
  });

  app.get("/user/new", (request, response) => {
    response.render("createAccount", 
    {
      title: "New User",
      layout: "login"
    });
  });

  // res.render('home', {layout: 'viewBLayout.hbs'});

  app.get("/seeds", (request, response) => {
    response.render("seeds", {title: "Seed page"})
  })

  app.get("/", (request, response) => {
    response.render("index", 
    {
      title: "Dogs Day Out",
      layout: "login"
    });
  });

  app.get("/search", isAuthenticated, (request, response) => {
    response.render("search", {
      title: "Search meetups",
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (request, response) => {
    response.render("404");
  });
};

// Day Page Utilities..........................................................

function formatParksForHandlebars(parks) {
  for (let park of parks) {
    park.times = [
      {
        name: "Morning",
        event: park.Events.find(event => event.time === "Morning"),
      },
      {
        name: "Afternoon",
        event: park.Events.find(event => event.time === "Afternoon"),
      },
      {
        name: "Evening",
        event: park.Events.find(event => event.time === "Evening"),
      },
    ];

    park.Events = null;
  }

  return parks;
}

function formatDate(dateOnly) {
  const date = new Date(dateOnly + "T00:00:00");
  const dateString = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  });
  
  return dateString;
}