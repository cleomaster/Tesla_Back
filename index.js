const db = require('./config/db');
const seed = require('./config/seed');
const products = require('./routes/products');
const users = require('./routes/users');
const carts = require('./routes/carts');
const CartItems = require('./models/CartItems');
const orders = require('./models/Orders');
const express = require('express');
const app = express();


app.use(express.json());
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/carts', carts);

const InitiateConnection = async () => {
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

InitiateConnection();



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));