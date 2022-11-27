const db = require('../config/db');
const { DataTypes } = require('sequelize');
const Carts = require('../models/carts');

const Orders = db.define('orders', {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    placed_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
  }, {
    timestamps: false
  });

  Orders.belongsTo(Carts, {
    foreignKey: "cart_id", 
    onDelete: "CASCADE"
  });
  module.exports = Orders;

