module.exports = (sequelize, DataTypes) => {
  const Owner = sequelize.define("Owner", {
    name: DataTypes.STRING,
    // bio: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  Owner.associate = (models) => {
    models.Owner.hasMany(models.Dog, {
      onDelete: "CASCADE",
    });
  };

  return Owner;
};