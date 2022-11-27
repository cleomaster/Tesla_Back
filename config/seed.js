const db = require('../config/db');
const Users = require('../models/Users');
const Products = require('../models/Products');
const Carts = require('../models/Carts');
const CartItems = require('../models/CartItems');
const Orders = require('../models/Orders');

async function seed() {
   await db.sync({ force: true });
   await Users.create({ user_id: 1, name: "Nabil", email: "nabil@gmail.com", password: "12345678" });
   await Users.create({ user_id: 2, name: "Adil", email: "adil@gmail.com", password: "12345678" });
   await Products.create({product_id: 1, name: "Model X", description: "This is Model X", price: 1000});
   await Products.create({product_id: 2, name: "Model Y", description: "This is Model Y", price: 2000});
   await Products.create({product_id: 3, name: "Model Z", description: "This is Model Z", price: 3000});
   await Carts.create({ cart_id: 1, user_id: 1 });
   await CartItems.create({ quantity: 2, price: 1000.0, cart_id: 1, product_id: 1});
   await CartItems.create({quantity: 4, price: 1000.0, cart_id: 1, product_id: 3});
   await Orders.create({order_id: 1, cart_id: 1, placed_at: "2019-5-10"});
}

module.exports = seed;
