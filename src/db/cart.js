module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define(
      "cart",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      { timestamps: true }
    );
    Cart.associate = (models) => {
      Cart.belongsTo(models.User);
      Cart.belongsTo(models.Product);
    };
    return Cart;
  };
  