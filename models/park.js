module.exports = (sequelize, DataTypes) => {
  const Park = sequelize.define("Park", {
    name: DataTypes.STRING,
    lat: DataTypes.DECIMAL(9, 6),
    lon: DataTypes.DECIMAL(9, 6),
  });

  return Park;
};