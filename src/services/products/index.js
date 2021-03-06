const express = require("express");
const Product = require("../../db").Product;
const Category = require("../../db").Category;
const Review = require("../../db").Review;
const { Op } = require("sequelize");
const router = express.Router();
const multer = require("multer")

const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("../../cloudinary")

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: "amazon"
  }
})
const cloudMulter =  multer({ storage: cloudStorage})
router
  .route("/")
  
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({
        include: {
          model: Category,
          where: req.query.category
            ? {
                name: { [Op.iLike]: "%" + req.query.category + "%" },
              }
            : {},
        },
       
        offset: parseInt(req.query.offset) | 0,
        limit: parseInt(req.query.limit) | 10,
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newElement = await Product.create(req.body);
      res.send(newElement);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findByPk(req.params.id);
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await Product.update(req.body, {
        returning: true,
        plain: true,
        where: {
          id: req.params.id,
        },
      });
      res.send(updatedData[1]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      Product.destroy({ where: { id: req.params.id } }).then((rowsDeleted) => {
        if (rowsDeleted > 0) res.send("Deleted");
        else res.send("no match");
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

  router
  .route("/:id/reviews")
  .get(async (req,res,next)=>{
    try {
        const data = await Product.findByPk(req.params.id,{
          include: Review,
          offset: parseInt(req.query.offset) | 0,
          limit: parseInt(req.query.limit) | 10,
        });
        res.send(data);
      } catch (e) {
        console.log(e);
        next(e);
      }
    })
   router
      .route("/:id/image/upload")
      .post(
      cloudMulter.single("image"), async (req, res, next) =>{
        
        try{
            console.log("req file",req.file.path)
            const updatedData = await Product.update({image:req.file.path}, {
                returning: true,
                plain: true,
                where: {
                  id: req.params.id,
                },
              });
              res.send(updatedData[1]);
            }
        catch(ex){
            console.log(ex)
            next(ex)
        }
      })
  
 


module.exports = router;
