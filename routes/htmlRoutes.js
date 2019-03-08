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
      .findAll({
        where: {
          date: request.params.date,
        },
        include: [
          {model: db.Park},
        ],
        order: [
          [db.Event.associations.Park, "name", "ASC"],
        ],
      })
      .then((events) => {
        if (events.length > 0) {
          const parks = formatEventsForHandlebars(events);
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

  app.get("/event/:id", isAuthenticated, (request, response) => {
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

/** Define an order for the time of day names, since alphabetical doesn't make sense. */
function getTimeSortOrder(time) {
  switch (time) {
    case "Morning":   return 0;
    case "Afternoon": return 1;
    case "Evening":   return 2;
    default:          return 0;
  }
}

function formatEventsForHandlebars(events) {
  let parks = [];
  let parkName = null;
  let park = null;

  for (const event of events) {
    if (event.Park.name !== parkName) {
      park = event.Park;
      park.events = [];
      parks.push(park);

      parkName = park.name;
    }

    park.events.push({
      id: event.id,
      time: event.time,
    });
  }

  for (const park of parks) {
    park.events.sort((a, b) => {
      return getTimeSortOrder(a.time) - getTimeSortOrder(b.time);
    });
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