const express = require("express");
const Product = require("../../db").Product;
const Category = require("../../db").Category;
const Cart = require("../../db").Cart;
const User = require("../../db").User;
const { Op, Sequelize } = require("sequelize");
const router = express.Router();

router.route("/:userId").get(async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      include: [{ model: Product, include: [Category] }, User],
      attributes: [
        [Sequelize.fn("count", Sequelize.col("productId")), "qty"],
        [Sequelize.fn("sum", Sequelize.col("product.price")), "total"],
      ],
      group: ["product.id", "product->category.id", "user.id"],
      where: { userId: req.params.userId },
    });

    const qty = await Cart.count();
    const total = await Cart.sum("product.price", {
      include: { model: Product, attributes: [] },
    });
    res.send({ products: cart, qty, total });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router
  .route("/:userId/add-to-cart/:productId")
  .post(async (req, res, next) => {
    try {
      const newRow = await Cart.create({
        userId: req.params.userId,
        productId: req.params.productId,
      });
      res.send(newRow);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  
  router
  .route("/:userId/delete/:productId/fromCart")
  .delete(async (req, res, next) => {
    try {
        Cart.destroy({ where: { 
             userId: req.params.userId,
             productId: req.params.productId}
             }).then((rowsDeleted) => {
            if (rowsDeleted > 0) res.send("Deleted");
            else res.send("no match");
          });

    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
