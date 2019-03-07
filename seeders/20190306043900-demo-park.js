"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Parks", [
        {
          name: "Barker Field",
          lat: 37.539114,
          lon: -77.482023,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rockwood Park",
          lat: 37.448200,
          lon: -77.582310,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Parks", null, {});
  },
};