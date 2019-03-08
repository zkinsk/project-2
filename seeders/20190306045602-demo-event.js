"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Events", [
        {
          date: "2019-03-09",
          time: "Afternoon",
          ParkId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: "2019-03-09",
          time: "Afternoon",
          ParkId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: "2019-03-09",
          time: "Evening",
          ParkId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Events", null, {});
  },
};