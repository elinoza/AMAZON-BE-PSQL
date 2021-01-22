
const express = require("express");
require("dotenv").config();
  const productsRouter = require("./services/products");
const reviewsRouter = require("./services/reviews");
// const usersRouter = require("./services/users");
// const categoryRouter = require("./services/category");

const db = require("./db");
const cors = require("cors");

const server = express();

server.use(cors());
 server.use(express.json());
 server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);
// server.use("/users", usersRouter);
// server.use("/category", categoryRouter);

db.sequelize.sync({ force:false}).then((result) => {
  server.listen(process.env.PORT || 5000, () => {
    console.log("server is running on port ", process.env.PORT || 5000);
  });
});
