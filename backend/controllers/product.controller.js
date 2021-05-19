
const db = require("../models");
const mongoose = require("mongoose");

const Product = db.Product;

exports.getProduct = (req, res) => {
  Product.find({}, function (err, users) {
    if (err) {
      return res.send(500).send({ message: err.message });
    }
    var userMap = {};

    users.forEach(function (user) {
      userMap[user._id] = user;
    });

    return res.send(userMap);
  });
};

exports.insertProduct = (req, res) => {
  console.log(req.body);
  const product = new Product(req.body);

  Product.findOne({ name: product.name }, (err, pro) => {
    if (!pro) {
      product.save()
        .then((result) => {
          return res.status(201).send({ message: "Product created!" });
        })
        .catch((err) => {
          return res.status(500).send(err);
        });
    }
    if (pro) {
      Product.updateOne({ name: product.name }, req.body, (err, success) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        if (success) {
          return res.status(200).send({ message: "Product Updated!" });
        }
      });
    }
  });
};

exports.getProductById = (req, res) => {
  const id = req.params.id;
  Product.findById({ _id: mongoose.Types.ObjectId(id) })
    .then((pro) => {
      return res.status(200).json(pro);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

exports.deleteProduct = (req,res)=>{
  console.log(req.params.id)
  Product.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) })
  .then((msg)=>{
    return res.status(200).send({message:'Product deleted success!'});
  })
  .catch((err)=>{
    return res.status(500).json({ message: err.message });
  })
}