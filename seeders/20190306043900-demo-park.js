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
          name: "Churchill Dog Park",
          lat: 37.5239282,
          lon: -77.4126637,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Northside Dog Park",
          lat: 37.5977001,
          lon: -77.4436564,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Phideaux Dog Park",
          lat: 37.5198621,
          lon: -77.483193,
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