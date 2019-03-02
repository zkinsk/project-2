var db = require("../models");

module.exports = function(app) {
  app.get("/api/dog", (request, response) => {
    db.Dog
      .findAll()
      .then((dogs) => {
        response.json(dogs);
      });
  });

  app.post("/api/dog", (request, response) => {
    db.Dog
      .create(request.body)
      .then((dog) => {
        response.json(dog);
      });
  });

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
  });
};
