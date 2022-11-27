const db = require('../config/db');
const { DataTypes } = require('sequelize');
const Products = require('../models/Products');
const Carts = require('../models/carts');

const CartItems = db.define('CartItems', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
  }, {
    timestamps: false
  });

 CartItems.removeAttribute('id');

  CartItems.belongsTo(Carts, {
    foreignKey: "cart_id",
    onDelete: "CASCADE"
  });

  CartItems.belongsTo(Products, {
    foreignKey: "product_id",
    onDelete: "CASCADE"
  });


  module.exports = CartItems;


