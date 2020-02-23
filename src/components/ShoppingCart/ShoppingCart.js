import React, { useEffect, useState } from 'react';
import { mockFetch } from '../../utils/mocks/mockFetch';
import Products from '../Products/Products.js';

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const products = await mockFetch();

      setProducts(products);
    }

    fetchData()
  }, []);

  return <section className='c-shopping-cart'>
    <header><h1>Shopping Cart</h1></header>
    <Products products={products} />
  </section>;
}

export default ShoppingCart;
