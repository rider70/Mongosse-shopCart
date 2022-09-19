const fs = require("fs");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
});

exports.addProduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.putProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    const id = req.params.id;
    const updat = req.body;
    await Product.findByIdAndUpdate(id,updat);
    res.status(200).json({
      status: "success",
      data: {
        product: updat,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.deleteProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  
  if (foundProduct) {
    const id = req.params.id;
    await Product.findByIdAndRemove(id);
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
