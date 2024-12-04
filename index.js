const express = require('express');
const { resolve } = require('path');
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
// http://localhost:3000/cart/add?productId=3&name=Tablet&price=15000&quantity=1
app.get('/cart/add', (req, res) => {
  try {
    const { productId, name, price, quantity } = req.query;
    const result = [...cart, { productId, name, price, quantity }];
    res.status(200).json({ cartItems: result });
  } catch (e) {
    res.status(500).json(e);
  }
});

app.get('/cart/edit', (req, res) => {
  try {
    const { productId, quantity } = req.query;
    const result = cart.map((res) => {
      if (res.productId == productId) {
        return { ...res, quantity: quantity };
      } else {
        return res;
      }
    });
    res.status(200).json({ cartItems: result });
  } catch (e) {
    res.status(500).json(e);
  }
});
// http://localhost:3000/cart/delete?productId=1
app.get('/cart/delete', (req, res) => {
  try {
    const { productId } = req.query;
    cart = cart.filter((res) => res.productId != productId);
    res.status(200).json({ cartItems: cart });
  } catch (e) {
    res.status(500).json(e);
  }
});

app.get('/cart', (req, res) => {
  try {
    res.status(200).json({ cartItems: cart });
  } catch (e) {
    res.status(500).json(e);
  }
});

app.get('/cart/total-quantity', (req, res) => {
  try {
    let sum = 0;
    cart.map((res) => (sum += res.quantity));
    res.status(200).json({ totalQuantity: sum });
  } catch (e) {
    res.status(500).json(e);
  }
});

app.get('/cart/total-price', (req, res) => {
  try {
    let sum = 0;
    cart.map((res) => (sum += res.price * res.quantity));
    res.status(200).json({ totalPrice: sum });
  } catch (e) {
    res.status(500).json(e);
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
