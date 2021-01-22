module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
        timestamps: false,
      });
    User.associate = (models) => {
        User.hasMany(models.Review);
        User.hasMany(models.Cart);
      User.belongsToMany(models.Product, {
        through: { model: models.Cart, unique: false },
      });
      
    };
    return User;
  };
  