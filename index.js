const db = require('./config/db');
const seed = require('./config/seed');
const products = require('./routes/products');
const users = require('./routes/users');
const carts = require('./routes/carts');
const CartItems = require('./models/CartItems');
const orders = require('./models/Orders');
const Products = require('./models/Products');
const cors = require("cors");
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/carts', carts);

app.get("/", (req, res) => {
  res.send("hello");
})

const InitiateConnection = async () => {
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  seed();
}

InitiateConnection();



const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));