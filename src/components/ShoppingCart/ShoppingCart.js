import React, { useEffect } from 'react';
import { mockFetch } from '../../utils/mocks/mockFetch';


const ShoppingCart = () => {
  useEffect(() => {
    const fetchData = async () => {
      const products = await mockFetch();
      console.log(products);
    }

    fetchData()
  }, []);

  return <section className='c-shopping-cart'>
    <header><h1>Shopping Cart</h1></header>
  </section>;
}

export default ShoppingCart;
