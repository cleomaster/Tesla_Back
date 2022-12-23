const express = require('express');
const router = express.Router();
const Products = require('../models/Products');
const Carts = require('../models/carts.js');
const CartItems = require("../models/CartItems");
const Orders = require('../models/Orders');
const auth = require("../middlewares/auth");
const db = require('../config/db');


router.get("/mycart", auth, async (req, res) => {

    const { dataValues: cart } = await Carts.findOne({
        where: { user_id: req.user.user_id }
    }) || {}

    if(!cart) return res.send({});
    console.log(cart.cart_id);
    let cartItems = await CartItems.findAll({
        where: {
            cart_id: cart.cart_id
        }
    })

    res.send(cartItems);
})

router.post('/add/:id', auth, async (req, res) => {
    const { dataValues: product } = await Products.findOne({
        where: { product_id: req.params.id }
    }) || {}

    if(!product) return res.send("Product does not exist.");

    const { dataValues: cart } = await Carts.findOne({
        where: { user_id: req.user.user_id}
    }) || {}

    if (!cart) {
       let NewCart = await Carts.create({user_id: req.user.user_id});
       await Orders.create({cart_id: NewCart.cart_id, placed_at: Date()})
       await CartItems.create({price: product.price, quantity: 1, cart_id: NewCart.cart_id, product_id: product.product_id})
    } else {
        const { dataValues: CartItem } = await CartItems.findOne({
            where: {
                cart_id: cart.cart_id,
                product_id: product.product_id
            }
        }) || {}

        if(!CartItem) {
         await CartItems.create({price: product.price, quantity: 1, cart_id: cart.cart_id, product_id: product.product_id})
        } else {
            await CartItems.increment('quantity', {
                by: 1,
                where: {
                  product_id: product.product_id,
                  cart_id: cart.cart_id
                }
              });
        }
    }

    res.send("Added to cart");
})

router.post("/remove/:id", auth, async (req, res) => {

    const { dataValues: product } = await Products.findOne({
        where: { product_id: req.params.id }
    }) || {}

    if(!product) return res.send("Product does not exist.");

    const { dataValues: cart } = await Carts.findOne({
        where: { user_id: req.user.user_id }
    }) || {}

    if(!cart) return res.send("Cart does not exist.");

    let { dataValues: CartItem } = await CartItems.findOne({
        where: {
            product_id: product.product_id,
            cart_id: cart.cart_id
        }
    }) || {}

    if (!CartItem) return res.send("Product does not exist in cart.")

    await CartItems.destroy({
        where: { product_id: product.product_id, cart_id: cart.cart_id },
      });

      const itemsLeft = await CartItems.findAll({
        where: {cart_id: cart.cart_id }
      });

      if(itemsLeft.length === 0) {
        await Carts.destroy({
            where: {cart_id: cart.cart_id}
        })
      }

      res.send("Item successfully removed.");

})

router.put("/decrement/:id", auth, async (req, res) => {
    const { dataValues: product } = await Products.findOne({
        where: { product_id: req.params.id }
    }) || {}

    if(!product) return res.send("Product does not exist.");

    const { dataValues: cart } = await Carts.findAll({
        where: { user_id: req.user.user_id }
    }) || {}

    if(!cart) return res.send("Cart does not exist.");


    let { dataValues: CartItem } = await CartItems.findOne({
        where: {
            product_id: product.product_id,
            cart_id: cart.cart_id
        }
    }) || {}

    if (!CartItem) return res.send("Product does not exist in cart.")

    if (CartItem.quantity === 1) {
        await CartItems.destroy({
            where: { product_id: product.product_id, cart_id: cart.cart_id },
          });
          return res.send("Successfully removed.");
    }

    await CartItems.decrement('quantity', {
        by: 1,
        where: {
          product_id: product.product_id,
          cart_id: cart.cart_id
        }
      });

      const itemsLeft = await CartItems.findAll({
        where: {cart_id: cart.cart_id }
      });

      if(itemsLeft.length === 0) {
        await Carts.destroy({
            where: {cart_id: cart.cart_id}
        })
      }

      res.send("Operation successful");
})

router.get("/total", auth, async (req, res) => {

    const { dataValues: cart } = await Carts.findOne({
        where: { user_id: req.user.user_id }
    }) || {}

    if(!cart) return res.send({total: 0});

    const total = await CartItems.findOne({
        where: {
            cart_id: cart.cart_id
        },
        group : ['cart_id'],
        attributes: [[db.fn('sum', db.col('price')), 'total']],
        raw: true
      }) || {total: 0}
      res.send(total);
})

module.exports = router;
