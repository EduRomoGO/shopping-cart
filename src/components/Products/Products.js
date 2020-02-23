import React from 'react';
import Button from 'react-bootstrap/Button';

const Products = ({ products, onAddItem }) => {
  const handleItemClick = itemId => {
    onAddItem(itemId);
  }

  const renderProduct = ({id, name}) => {
    return <li key={id}>
      <div>{name}</div>
      <Button onClick={() => handleItemClick(id)}>+</Button>
      <Button>-</Button>
      </li>
  }

  return <ul>
    {products.map(item => renderProduct(item))}
  </ul>;
}

export default Products;
