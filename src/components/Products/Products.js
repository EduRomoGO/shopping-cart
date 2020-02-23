import React from 'react';
import Button from 'react-bootstrap/Button';

const Products = ({ products, onAddItem, onRemoveItem }) => {
  const handleAddItemClick = itemId => {
    onAddItem(itemId);
  }
  const handleRemoveItemClick = itemId => {
    onRemoveItem(itemId);
  }

  const renderProduct = ({id, name}) => {
    return <li key={id}>
      <div>{name}</div>
      <Button onClick={() => handleAddItemClick(id)}>+</Button>
      <Button onClick={() => handleRemoveItemClick(id)}>-</Button>
      </li>
  }

  return <ul>
    {products.map(item => renderProduct(item))}
  </ul>;
}

export default Products;
