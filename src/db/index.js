const { Sequelize, DataTypes } = require("sequelize");
const Review= require("./reviews");
const User = require("./users");
const Category = require("./category");
const Product = require("./products");
const Cart = require("./cart");

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
  }
);

const models = {
  Product: Product(sequelize, DataTypes),
  User: User(sequelize, DataTypes),
  Category: Category(sequelize, DataTypes),
  Review: Review(sequelize, DataTypes),
  Cart: Cart(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log("Connection failed ", e));

module.exports = models;
