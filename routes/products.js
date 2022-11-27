const express = require('express');
const router = express.Router();
const Products = require('../models/Products');
const Carts = require('../models/Carts');
const CartItems = require("../models/CartItems");
const Orders = require('../models/Orders');

router.post('/add/:id', async (req, res) => {
    let product = await Products.findAll({
        where: {
            product_id: req.params.id
        }
    })
    if(product.length === 0) return res.send("Not found");
    product = product[0].dataValues;

    let cart = await Carts.findAll({
        where: {
            user_id: 2
        }
    })

    if (cart.length === 0) {
       let NewCart = await Carts.create({user_id: 2});
       await Orders.create({cart_id: NewCart.cart_id, placed_at: Date()})
       await CartItems.create({price: product.price, quantity: 1, cart_id: NewCart.cart_id, product_id: product.product_id})
    } else {
        cart = cart[0].dataValues;
        let CartItem = await CartItems.findAll({
            where: {
                cart_id: cart.cart_id,
                product_id: product.product_id
            }
        })
        if(CartItem.length === 0) {
         await CartItems.create({price: product.price, quantity: 1, cart_id: cart.cart_id, product_id: product.product_id})
        } else {
            await CartItems.increment('quantity', {
                by: 1,
                where: {
                  product_id: product.product_id
                }
              });
        }
    }

    res.send("Added to cart" + req.params.id);
})



module.exports = router;