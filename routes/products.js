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
// router.get("/", async (req, res) => {
//   const query = req.query;
//   console.log(query)
//   try {
//     if (query.page === "all") {
//       const products = await Product.find();
//       res.status(200).json(products);
//     } else if (query.category || query.frametype) {
//       const products = await Product.find({
//         $or: [{ category: query.category }, { frametype: query.frametype }],
//       })
//         .limit(4)
//         .skip(query.page * 4);
//       res.status(200).json(products);
//     } else {
//       const products = await Product.find()
//         .limit(4)
//         .skip(query.page * 4);
//       res.status(200).json(products);
//     }
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// });

router.get("/", async (req, res) => {
  const query = req.query;
  const categoryQuery = () => {
    const categories = ['bag', 'specticles']
    return query.category ? categories.filter(category => category === query.category) : categories
  }
  const frametypeQuery = () => {
    const frametypes = ['slim', 'cateye']
    return query.frametype ? frametypes.filter(frametype => frametype === query.frametype) : frametypes
  }

  console.log(query, categoryQuery(), frametypeQuery())
  try {
    if (query.page === "all") {
      const products = await Product.find();
      res.status(200).json(products);
    } else if (query.category || query.frametype) {
      const products = await Product.find({
        $and : [{ category: { $in: categoryQuery() } }, { frametype: { $in: frametypeQuery() } }]
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


// deleing single post
router.delete('/:productId', async (req, res) => {
  try {
      const deleteProduct = await Product.remove({ _id: req.params.productId })
      res.status(200).json(deleteProduct)
  } catch (error) {
      res.status(400).json({ message: error })
  }
})

module.exports = router;
