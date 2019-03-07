var db = require("../models");
var passport = require("../config/passport");

const Op = db.sequelize.Op;

module.exports = function(app) {
  app.get("/api/dog", (request, response) => {
    db.Dog
      .findAll()
      .then((dogs) => {
        response.json(dogs);
      });
  });//end of get all dogs

  app.post("/api/dog", (request, response) => {
    db.Dog
      .create(request.body)
      .then((dog) => {
        response.json(dog);
      });
  });//end of create new dog

  app.delete("/api/dog/:id", (request, response) => {
    db.Dog
      .destroy({
        where: {
          id: request.params.id
        }
      })
      .then((dog) => {
        response.json(dog);
      });
  });//end of dog delete

  app.get("/api/event", (request, response) => {
    let options = {
      include: [
        {
          model: db.Park,
        },
      ],
    };

    // This allows getting events for a specific day by specifying it like `/api/event?date=2019-03-09`.
    if (request.query.date) {
      options.where = {
        date: request.query.date,
      };
    }

    db.Event
      .findAll(options)
      .then((events) => {
        response.json(events);
      });
  });//end of get events

  app.get("/api/event/date", (request, response) => {
    const options = {
      attributes: [
        [db.sequelize.fn("DISTINCT", db.sequelize.col("date")), "date"],
      ],
    };

    // This allows getting event dates for a month by specifying it like `/api/event/date?month=2019-03`.
    if (request.query.month) {
      const startDate = new Date(request.query.month + "-01T00:00:00");
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);

      options.where = {
        date: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      };
    }
    
    db.Event
      .findAll(options)
      .then((events) => {
        response.json(events);
      });
  });// end of get event dates

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/user/profile");
  });//end of login

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });//end of signup

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });//end of logout

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        user: {id: req.user.id}
      });
    }
  });

};//end of module exports
