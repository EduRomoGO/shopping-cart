import React, { useEffect, useState } from 'react';
import { mockFetch } from '../../utils/mocks/mockFetch';
import Products from '../Products/Products.js';

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const products = await mockFetch();

      setProducts(products);
      setIsLoading(false);
    }

    fetchData()
  }, []);

  return <section className='c-shopping-cart'>
    <header><h1>Shopping Cart</h1></header>
    {isLoading
      ? <div data-testid='loader'>Loading...</div>
      : <Products products={products} />}
  </section>;
}

export default ShoppingCart;
