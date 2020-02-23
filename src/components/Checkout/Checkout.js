import React from 'react';

const renderCart = products => {
  return products
    .filter(item => item.cart.quantity > 0)
    .map(({ id, name, price, currency }) => <li key={id}>{name}: {price}{currency}</li>)
}

const Checkout = ({ products }) => {
  return <section>
    <header><h1>Checkout</h1></header>
    <ul>{renderCart(products)}</ul>
  </section>;
}

export default Checkout;
