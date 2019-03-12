var aws = require("aws-sdk");
var db = require("../models");
const multer = require("multer");
var passport = require("../config/passport");
const path = require("path");
const upload = multer({});

const Op = db.sequelize.Op;
const S3_BUCKET = process.env.S3_BUCKET;

aws.config.region = "us-east-1";

module.exports = function(app) {
  // *************************
  // **** dog api routes *****
  app.get("/api/dog/:id", (req, res) => {
    db.Dog.findAll({
      where: {
        UserID: req.params.id
      },
      include: [
        {
          model: db.User,
          required: true,
          attributes: ["name"]
        }
      ]
    })
      .then(dogs => {
        // console.log(dogs[0].User.dataValues.name);
        // console.log(dogs);
        res.json(dogs);
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  }); //end of get all dogs by user id

  app.post("/api/dog", (request, response) => {
    db.Dog.create(request.body).then(dog => {
      response.json(dog);
    });
  }); //end of create new dog

  app.delete("/api/dog/:id", (request, response) => {
    db.Dog.destroy({
      where: {
        id: request.params.id
      }
    }).then(dog => {
      response.json(dog);
    });
  }); //end of dog delete

  app.patch("/api/dog/:id/profile-image", upload.single("file"), (request, response) => {
    const fileName = generateFileName(request.file.originalname);

    const s3 = new aws.S3();
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      ContentType: request.file.mimetype,
      ACL: "public-read",
      Body: request.file.buffer,
    };

    s3.putObject(s3Params, (error, data) => {
      if (error) {
        console.error(error);
        return response.status(500).end();
      }

      const url = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;

      db.Dog
        .update(
          {
            profileImage: url,
          },
          {
            where: {
              id: request.params.id,
            },
          }
        )
        .then((affectedRows) => {
          if (affectedRows[0] !== 1) {
            return response.status(500).end();
          }

          const returnData = {
            profileImage: url,
          };
          
          response.write(returnData);
          response.end();
        })
        .catch((reason) => {
          console.error(reason);
          response.status(500).end();
        });
    });
  }); //end of update dog profile image

  // ^^^^^ dog api routes ^^^^
  // *************************

  // *************************
  //      Event API Routes

  app.get("/api/event/date", (request, response) => {
    const options = {
      attributes: [
        [db.sequelize.fn("DISTINCT", db.sequelize.col("date")), "date"]
      ]
    };

    // This allows getting event dates for a month by specifying it like `/api/event/date?month=2019-03`.
    if (request.query.month) {
      const startDate = new Date(request.query.month + "-01T00:00:00");
      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        1
      );

      options.where = {
        date: {
          [Op.gte]: startDate,
          [Op.lt]: endDate
        }
      };
    }

    db.Event.findAll(options).then(events => {
      response.json(events);
    });
  }); // end of get event dates

  app.get("/api/event/current/:date", (req, res) => {
    db.EventDayTimePark.findAll({
      where: {
        date: req.params.date
      },
      include: [
        {
          model: db.User,
          required: true,
          attributes: ["id"]
        }
      ]
    }).then(response => {
      res.json(response);
    });
  }); //end of current events on this date

  app.get("/api/event/active-events", (req, res) => {
    db.EventDayTimePark.findAll({
      attributes: [["date", "start"]],
      group: ["date"]
    }).then(response => {
      res.json(response);
    });
  }); //end of currentevents

  // Project.findAll({
  //   attributes: ['country'],
  //   group: ['country']
  // }).then(function(projects {
  //   projects.map(project => project.country)
  // });

  app.get("/api/user/user-events/:id", (req, res) => {
    db.EventDayTimePark.findAll({
      where: {
        UserId: req.params.id
      },
      include: [
        {
          model: db.Park,
          required: true,
          attributes: ["name"]
        }
      ]
    }).then(response => {
      res.json(response);
    });
  });
  app.get("/api/event/user-events/:id", (req, res) => {
    db.EventDayTimePark.findAll({
      attributes: [["date", "start"]],
      group: ["date"]
    }).then(response => {
      res.json(response);
    });
  }); //end of currentevents

  app.post("/api/event/attend", (req, res) => {
    console.log(req.body);
    db.EventDayTimePark.create({
      date: req.body.date,
      time: req.body.time,
      parkId: req.body.parkId,
      UserId: req.body.userId
    }).then(attendee => {
      console.log(attendee.dataValues);
      res.json(attendee);
    });
    //end of dbEventDayTimePark create
  });

  app.delete("/api/event/attend", (req, res) => {
    console.log("reqbody: ", req.body);
    db.EventDayTimePark.destroy({
      where: {
        date: req.body.date,
        time: req.body.time,
        parkId: req.body.parkId,
        UserId: req.body.userId
      }
    }).then(destroyed => {
      res.json(destroyed);
      console.log(destroyed);
    });
  }); //end of delete

  // ^^^^^ event api routes ^^^^
  // ***************************

  // **********************************
  // **** Login & user api routes *****

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/user/profile");
  }); //end of login

  app.get("/api/user/count/:name", (req, res) => {
    console.log("Looking for user");
    db.User.count({
      where: { email: req.params.name }
    })
      .then(result => {
        // console.log(result);
        res.json(result);
      })
      .catch(function(err) {
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
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  }); //end of signup

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  }); //end of logout

  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        user: { id: req.user.id, name: req.user.name }
      });
    }
  }); //end of user_data

  app.get("/api/user/:id", (req, res) => {
    db.User
      .findOne({
        attributes: [
          "id",
          "name",
          "profileImage",
        ],
        where: {
          id: req.params.id
        },
      })
      .then(name => {
        res.json(name);
      });
  });

  app.patch("/api/user/:id/profile-image", upload.single("file"), (request, response) => {
    const fileName = generateFileName(request.file.originalname);

    const s3 = new aws.S3();
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      ContentType: request.file.mimetype,
      ACL: "public-read",
      Body: request.file.buffer,
    };

    s3.putObject(s3Params, (error, data) => {
      if (error) {
        console.error(error);
        return response.status(500).end();
      }

      const url = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;

      db.User
        .update(
          {
            profileImage: url,
          },
          {
            where: {
              id: request.params.id,
            },
          }
        )
        .then((affectedRows) => {
          if (affectedRows[0] !== 1) {
            return response.status(500).end();
          }

          const returnData = {
            profileImage: url,
          };
          
          response.write(JSON.stringify(returnData));
          response.end();
        })
        .catch((reason) => {
          console.error(reason);
          response.status(500).end();
        });
    });
  });

  // ^^^ Login & user api routes ^^^^^
  // **********************************

  // **********************************
  // ******* Parks api routes *********
  app.get("/api/park/:id?", (req, res) => {
    if (req.params.id) {
      db.Park.findOne({
        where: { id: req.params.id }
      }).then(park => {
        res.json(park);
      });
    } else {
      db.Park.findAll().then(parks => {
        res.json(parks);
      });
    }
  }); //end of park get

  app.post("/api/park/seeds", (req, res) => {
    console.log(req.body);
    db.Park.create({
      name: req.body.name,
      lat: req.body.lat,
      lon: req.body.lon
    }).then(park => {
      res.json(park);
    });
  });

  // ^^^^^^ Parks api routes ^^^^^^^^^^
  // **********************************

  app.get("/api/search/:input", function(req, res) {
    console.log(req.params.input, "hit api");
    var searchInput = req.params.input;
    var data = {
      dogs: [],
      owners: []
    };
    db.Owners.findAll({
      where: {
        name: searchInput
      }
    }).then(owners => {
      data.owners = owners;

      db.Dogs.findAll({
        where: {
          name: searchInput
        }
      })
      .then((dogs) => {
        data.dogs = dogs;

        res.render(data);
      });
    });
      
    console.log(data);
  });
}; //end of module exports

function generateFileName(originalName) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"

  let id = "";
  for (let i = 0; i < 21; i++) {
    const index = Math.floor(64 * Math.random());
    id += alphabet[index];
  }

  return id + path.extname(originalName);
}
