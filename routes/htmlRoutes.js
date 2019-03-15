var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");


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

  app.get("/event/day/:date/:time/:parkId", isAuthenticated, (req, res) => {
    console.log(req.params);
    let date = req.params.date
    db.EventDayTimePark.findAll({
      where:{
        date: date,
        time: req.params.time,
        parkId: req.params.parkId
      },
      include:{
        model: db.User,
        attributes:["name", "id"]
      }
    }).then((attendees)=>{
      // console.log("html \n" ,result[0].User.dataValues)
      let attendee=[];
      let formatedDate = formatDate(date);
      // console.log(formatedDate);
      attendees.forEach(user =>{
        attendee.push(user.User.dataValues)
      });
      console.log(attendee);
      console.log(formatedDate);
      res.render("event", {
        title: "Event",
        attendee: attendee,
        formatedDateJson: JSON.stringify(formatedDate),
        attendeeJson: JSON.stringify(attendee),
      });
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

<<<<<<< HEAD
  app.get("/search", isAuthenticated, (request, response) => {
    response.render("search", {
      title: "Search meetups",
    });
  });

=======
>>>>>>> 306c2d7c8d043c04e7e9d42f5431687ae971918e
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
        range: "(7am - 12pm)",
        event: park.Events.find(event => event.time === "Morning"),
      },
      {
        name: "Afternoon",
        range: "(12pm - 6pm)",
        event: park.Events.find(event => event.time === "Afternoon"),
      },
      {
        name: "Evening",
        range: "(6pm - 10pm)",
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