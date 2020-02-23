import React, { useEffect, useState } from 'react';
import { mockFetch } from '../../utils/mocks/mockFetch';


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
    <ul>
      {products.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  </section>;
}

export default ShoppingCart;
