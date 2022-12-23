const db = require('../config/db');
const { DataTypes } = require('sequelize');
const Users = require('../models/Users');

const Carts = db.define('carts', {
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    timestamps: false
  });

  Carts.belongsTo(Users, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
  });
  module.exports = Carts;

