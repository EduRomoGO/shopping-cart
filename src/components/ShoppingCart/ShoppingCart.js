import React, { useEffect, useState, useReducer } from 'react';
import { mockFetch } from '../../utils/mocks/mockFetch';
import Products from '../Products/Products.js';
import Checkout from '../Checkout/Checkout.js';
import Button from 'react-bootstrap/Button';

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
  const [checkoutVisible, setCheckoutVisible] = useState(false);
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
      return products ? <Products onAddItem={handleAddItem} onRemoveItem={handleRemoveItem} products={products} /> : '';
    }
  }

  const renderCheckout = (products) => {
    return products ? <Checkout products={products} /> : '';
  }

  const getCartItemsNumber = products => {
    return products.reduce((acc, next) => acc + next.cart.quantity, 0);
  }

  return <section className='c-shopping-cart'>
    <header><h1>Shopping Cart</h1></header>
    <div data-testid='cartItemsNumber'>{getCartItemsNumber(products)}</div>
    {checkoutVisible
      ? renderCheckout(products)
      : renderProducts(isLoading, products, isError)
    }
    <Button onClick={() => setCheckoutVisible(true)}>Checkout</Button>
  </section>;
}

export default ShoppingCart;
