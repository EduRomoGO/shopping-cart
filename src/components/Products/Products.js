import React from 'react';

const Products = ({ products, onAddItem }) => {
  const handleItemClick = itemId => {
    onAddItem(itemId);
  }

  return <ul>
    {products.map(item => <li onClick={() => handleItemClick(item.id)} key={item.id}>{item.name}</li>)}
  </ul>;
}

export default Products;
