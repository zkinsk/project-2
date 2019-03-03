module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define("Dog", {
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    energy: DataTypes.INTEGER,
    patience: DataTypes.INTEGER,
    dominance: DataTypes.INTEGER,
  });

  Dog.associate = (models) => {
    models.Dog.belongsTo(models.Owner, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Dog;
};