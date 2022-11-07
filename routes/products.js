const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// adding product
router.post("/", async (req, res) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    mrp: req.body.mrp,
    discount: req.body.discount,
    category: req.body.category,
    brand: req.body.brand,
    frametype: req.body.frametype,
    color: req.body.color,
    productdetail: req.body.productdetail,
    images: req.body.images,
    instock: req.body.instock,
  });
  try {
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// getting products
router.get("/", async (req, res) => {
  const query = req.query;
  try {
    if (query.page === "all") {
      const products = await Product.find();
      res.status(200).json(products);
    } else if (query.category || query.frametype) {
      const products = await Product.find({
        $or: [{ category: query.category }, { frametype: query.frametype }],
      })
        .limit(4)
        .skip(query.page * 4);
      res.status(200).json(products);
    } else {
      const products = await Product.find()
        .limit(4)
        .skip(query.page * 4);
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
