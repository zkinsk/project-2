var db = require("../models");
var passport = require("../config/passport");


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
