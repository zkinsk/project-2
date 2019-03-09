module.exports = (sequelize, DataTypes) => {
  const Park = sequelize.define("Park", {
    name: DataTypes.STRING,
    lat: DataTypes.DECIMAL(10, 7),
    lon: DataTypes.DECIMAL(10, 7),
  });

  Park.associate = (models) => {
    models.Park.hasMany(models.Event, {
      onDelete: "CASCADE",
    });
  };

  return Park;
};