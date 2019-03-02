module.exports = (sequelize, DataTypes) => {
  const Park = sequelize.define("Park", {
    name: DataTypes.STRING,
  });

  return Park;
};