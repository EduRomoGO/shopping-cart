import React, { useEffect, useState, useReducer } from 'react';
import { mockFetch } from '../../utils/mocks/mockFetch';
import Products from '../Products/Products.js';
import Checkout from '../Checkout/Checkout.js';
import './ShoppingCart.css';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

const processProducts = products => {
  return products.map(item => ({ ...item, cart: { quantity: 0 } }));
}

const productsReducer = (products, action) => {
  const reducerMap = {
    load: payload => payload,
    addItemToCart: payload => {
      return products.map(item => {
        return item.id === payload
          ? { ...item, cart: { quantity: item.cart.quantity + 1 } }
          : item;
      });
    },
    removeItemFromCart: payload => {
      return products.map(item => {
        return item.id === payload
          ? { ...item, cart: { quantity: Math.max(0, item.cart.quantity - 1) } }
          : item;
      });
    }
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


  const handleAddItem = itemId => dispatch({ type: 'addItemToCart', payload: itemId });
  const handleRemoveItem = itemId => dispatch({ type: 'removeItemFromCart', payload: itemId });


  const renderProducts = (isLoading, products, isError) => {

    if (isLoading) {
      return <div data-testid='loader'>Loading...</div>;
    }

    if (isError) {
      return <div>Something went wrong...</div>;
    } else {
      return products ? <div>
        <div data-testid='cartItemsNumber'>{getCartItemsNumber(products)}</div>
        <Products onAddItem={handleAddItem} onRemoveItem={handleRemoveItem} products={products} />
      </div>
        : '';
    }
  }

  const renderCheckout = (products) => {
    return products ? <Checkout products={products} /> : '';
  }

  const getCartItemsNumber = products => {
    return products.reduce((acc, next) => acc + next.cart.quantity, 0);
  }


  const renderRouting = () => {
    return <div>
      <Switch>
        <Route path="/products">
          {renderProducts(isLoading, products, isError)}
          <Link role='button' className='button' to="/checkout">Checkout</Link>
        </Route>
        <Route path="/checkout">
          <Link role='button' className='button' to="/products">Products</Link>
          {renderCheckout(products)}
        </Route>
      </Switch>
    </div>
  }

  return <section className='c-shopping-cart'>
    <header><h1>Shopping Cart</h1></header>
    {renderRouting()}
  </section>;
}

export default ShoppingCart;
