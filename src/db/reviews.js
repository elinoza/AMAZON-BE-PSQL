module.exports = (sequelize, DataTypes) => {
    const Review= sequelize.define(
      "Review",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        comment: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        rate: {
            type: DataTypes.NUMBER ,
            allowNull: false,
          },
      },
      {
        timestamps: true,
      }
    );
  
  Review.associate = (models) => {
    Review.belongsTo(models.Product);
    Review.belongsTo(models.User);
    };
    return Review;
  };
  