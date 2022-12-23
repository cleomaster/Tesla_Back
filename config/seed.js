const db = require('../config/db');
const Users = require('../models/Users');
const Products = require('../models/Products');
const Carts = require('../models/carts.js');
const CartItems = require('../models/CartItems');
const Orders = require('../models/Orders');

async function seed() {
   await db.sync({ force: true });
   await Users.create({ user_id: 1, name: "Nabil", email: "nabil@gmail.com", password: "12345678" });
   await Users.create({ user_id: 2, name: "Adil", email: "adil@gmail.com", password: "12345678" });
   await Products.create({product_id: 1, name: "Model X", description: "With the most storage space and towing capacity of any electric SUV, and seating for up to seven adults, Model X delivers maximum utility. Front doors open and close automatically, Falcon Wing doors allow for easier loading and a standard trailer hitch lets you bring your gear anywhere you go.", price: 4000});
   await Products.create({product_id: 2, name: "Model Y", description: "With the most storage space and towing capacity of any electric SUV, and seating for up to seven adults, Model Y delivers maximum utility. Front doors open and close automatically, Falcon Wing doors allow for easier loading and a standard trailer hitch lets you bring your gear anywhere you go.", price: 5000});
   await Products.create({product_id: 3, name: "Model S", description: "With the most storage space and towing capacity of any electric SUV, and seating for up to seven adults, Model S delivers maximum utility. Front doors open and close automatically, Falcon Wing doors allow for easier loading and a standard trailer hitch lets you bring your gear anywhere you go.", price: 6000});
   await Carts.create({ cart_id: 1, user_id: 1 });
   await CartItems.create({ quantity: 1, price: 4000.0, cart_id: 1, product_id: 1});
   await CartItems.create({quantity: 1, price: 6000.0, cart_id: 1, product_id: 3});
   await Orders.create({order_id: 1, cart_id: 1, placed_at: "2019-5-10"});
}

module.exports = seed;
