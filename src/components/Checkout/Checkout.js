import React from 'react';

const renderCartItem = ({ id, name, price, currency, cart }) => {
  // book: 2eur x 1 = 2eur
  return <li key={id}>
    {name}: {price}{currency} x {cart.quantity} = {price * cart.quantity}{currency}
  </li>;
}

const renderCart = products => {
  return products
    .filter(item => item.cart.quantity > 0)
    .map(renderCartItem);
}

const Checkout = ({ products }) => {
  return <section>
    <header><h1>Checkout</h1></header>
    <ul>{renderCart(products)}</ul>
  </section>;
}

export default Checkout;
