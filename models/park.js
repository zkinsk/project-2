module.exports = (sequelize, DataTypes) => {
  const Park = sequelize.define("Park", {
    name: DataTypes.STRING,
    lat: DataTypes.INTEGER,
    lon: DataTypes.INTEGER,
  });

  return Park;
};