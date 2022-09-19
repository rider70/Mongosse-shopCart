const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.addUser = catchAsync(async (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  let newUser = await User.create(req.body);
  newUser = newUser.toObject();
  delete newUser.password;

  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.getAllUser = catchAsync(async (req, res) => {
  const user = await User.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: user.length,
    data: {
      user,
    },
  });
});

exports.getUserById = catchAsync(async (req, res) => {
  const foundProduct = await User.findById(req.params.id);
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

exports.putUserById = catchAsync(async (req, res) => {
  const foundProduct = await User.findById(req.params.id);
  if (foundProduct) {
    const id = req.params.id;
    const updat = req.body;
    await User.findByIdAndUpdate(id,updat);
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

exports.deleteUserById = catchAsync(async (req, res) => {
  const foundProduct = await User.findById(req.params.id);
  
  if (foundProduct) {
    const id = req.params.id;
    await User.findByIdAndRemove(id);
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
