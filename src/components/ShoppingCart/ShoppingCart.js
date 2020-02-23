import React, { useEffect, useState, useReducer } from 'react';
import { mockFetch } from '../../utils/mocks/mockFetch';
import Products from '../Products/Products.js';

const processProducts = products => {
  return products.map(item => ({ ...item, cart: { quantity: 0 } }));
}

const productsReducer = (state, action) => {
  const reducerMap = {
    load: payload => payload,
  };

  return reducerMap[action.type](action.payload);
};

const ShoppingCart = () => {
  const [products, dispatch] = useReducer(productsReducer, []);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const products = await mockFetch();

        dispatch({
          type: 'load',
          payload: processProducts(products),
        });
        // setProducts(processProducts(products));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        // console.log(err);
        setIsError(true);
      }
    }

    fetchData();
  }, []);

  const renderProducts = (isLoading, products, isError) => {

    if (isLoading) {
      return <div data-testid='loader'>Loading...</div>;
    }

    if (isError) {
      return <div>Something went wrong...</div>;
    } else {
      return products ? <Products products={products} /> : '';
    }
  }

  const getCartItemsNumber = products => {
    return products.reduce((acc, next) => acc + next.cart.quantity, 0);
  }

  return <section className='c-shopping-cart'>
    <header><h1>Shopping Cart</h1></header>
    <div data-testid='cartItemsNumber'>{getCartItemsNumber(products)}</div>
    {renderProducts(isLoading, products, isError)}
  </section>;
}

export default ShoppingCart;
