var db = require("../models");
var passport = require("../config/passport");


module.exports = function(app) {
  // *************************
  // **** dog api routes *****
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

  // **** dog api routes *****
  // *************************
  
  // **********************************
  // **** Login & user api routes *****

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/user/profile");
  });//end of login

  app.get("/api/user/count/:name", (req, res) => {
    console.log("Looking for user");
    db.User.count({
      where: {email: req.params.name}
    }).then( (result) => {
      // console.log(result);
      res.json(result);
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });


  app.post("/api/signup", (req, res) => {
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

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });//end of logout

  app.get("/api/user_data", (req, res) => {
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
  });//end of user_data

  // **** Login & user api routes *****
  // **********************************

  // **********************************
  // ******* Parks api routes *********
  app.get("/api/park/:id?", (req, res) => {
    if (req.params.id){
      db.Park.findOne({
        where: {id: req.params.id}
      }).then( (park)=>{
        res.json(park)
      })
    }else{
      db.Park.findAll().then( (parks) => {
        res.json(parks);
      });
    }
  }); //end of park get

  // ******* Parks api routes *********
  // **********************************


};//end of module exports
