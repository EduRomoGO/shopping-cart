import React from 'react';

const Products = ({ products }) => {
  return <ul>
    {products.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>;
}

export default Products;
