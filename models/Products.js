const db = require('../config/db');
const { DataTypes } = require('sequelize');

const Products = db.define('products', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
  }, {
    timestamps: false
  });

  module.exports = Products;

