module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define("Dog", {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    bio: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    energy: DataTypes.INTEGER,
    patience: DataTypes.INTEGER,
    dominance: DataTypes.INTEGER,
    profileImage: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
  });

  Dog.associate = (models) => {
    models.Dog.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Dog;
};