import React from 'react';

const getCart = products => products.filter(item => item.cart.quantity > 0);

const renderCartItem = ({ id, name, price, currency, cart }) => {
  return <li key={id}>
    {name}: {price}{currency} x {cart.quantity} = {price * cart.quantity}{currency}
  </li>;
}

const renderCart = products => {
  return getCart(products).map(renderCartItem);
}

const getTotalPrice = products => {
  return getCart(products).reduce((acc, next) => {
    return acc + (next.cart.quantity * next.price);
  }, 0);
}

const Checkout = ({ products }) => {
  return <section>
    <header><h1>Checkout</h1></header>
    <ul>{renderCart(products)}</ul>
    <div data-testid='total-price'>{getTotalPrice(products)}{products[0].currency}</div>
  </section>;
}

export default Checkout;
