const fs = require("fs");
const crypto = require("crypto");
const Cart = require("../models/Cart");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const cartRouter = require("../routes/cartRoutes");

exports.addCart = catchAsync(async (req, res) => {
  const prod= req.body.product;
  const PendingShoppingCart = await Cart.findOne({ status: "PENDING"} )
  const cartProd = await Cart.findOne({ product: prod });
  //console.log(cartProd);
  if(PendingShoppingCart){
    if(cartProd!=null){
      res.status(200).json({
        Mensage: "El proucto ya exite en el carrito",
        data: {
          cart: cartProd,
        },
      });
    }
    else{
      if(cartProd==null){
      const newCart = await Cart.create(req.body);
      res.status(200).json({
        status: "success",
        Mensage: "Producto anadido al carrito de compra",
        data: {
          product: newCart,
        },
      });
    }
  }
  }
  else{
    const newCart = await Cart.create(req.body);
      res.status(200).json({
        status: "success",
        Mensage: "Producto anadido al carrito de compra",
        data: {
          product: newCart,
        },
      });
  }   
  });

  exports.deleteProductCartById = catchAsync(async (req, res) => {
    const PendingShoppingCart = await Cart.find({ status: "PENDING"} )
    const foundCart = await Cart.findById(req.params.id);
    
    if (foundCart && PendingShoppingCart) {
      const id = req.params.id;
      await Cart.findByIdAndRemove(id);
      res.status(200).json({
        status: "success",
        Mensage:"producto eliminao el carrito",
        data: {
          product: foundCart,
        },
      });
    } else {
      res.status(404).json({
        status: "not found",
      });
    }
  });

  exports.payCarts = catchAsync(async (req, res) => {
    const PendingShoppingCart = await Cart.findOne({ status: "PENDING"} )
    console.log(PendingShoppingCart);
    if(PendingShoppingCart){
      //const status= req.body.status;
      const payProd = await Cart.updateMany({status:"PENDING"},{$set:{status:"PAY"}});
      res.status(200).json({
        status: "success",
        Mensage:"Producto Pagado",
        data: {
          product: payProd,
        },
      });
    }
    else{
      res.status(404).json({
        status: "Agrege al meno un Producto para Pagar",
      });
    }
    
   
  });
  
  
  

