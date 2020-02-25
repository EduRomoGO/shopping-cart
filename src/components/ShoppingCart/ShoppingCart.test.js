import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ShoppingCart from './ShoppingCart.js';
import { mockFetch } from '../../utils/mocks/mockFetch.js'
import { products } from '../../utils/mocks/mocks.js'
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';


jest.mock('../../utils/mocks/mockFetch.js');

afterEach(() => {
  cleanup();
  jest.resetAllMocks()
});

describe('Shopping Cart', () => {

  it('renders correctly', async () => {
    mockFetch.mockResolvedValueOnce(products);

    const history = createMemoryHistory();
    const route = '/products';
    history.push(route);
    const { queryByTestId, getAllByRole, getByRole, getByText, getAllByText, findAllByRole, findByRole, getByTestId } = render(
      <Router history={history}>
        <ShoppingCart />
      </Router>
    );

    const appTitle = getByText('Shopping Cart');
    expect(appTitle).toBeInTheDocument();


    // Component starts loading data
    expect(getByTestId('loader')).toBeInTheDocument();

    expect(mockFetch).toHaveBeenCalledTimes(1);



    // Components shows data fetched and hides loader
    const productNodesList = await findByRole('list');
    expect(productNodesList).toBeInTheDocument();

    const productNodes = await findAllByRole('listitem');
    expect(productNodes.length).toEqual(products.length);

    expect(queryByTestId('loader')).toBeNull();

    const cartNumberOfItems = getByTestId('cartItemsNumber');
    expect(cartNumberOfItems).toBeInTheDocument();
    expect(cartNumberOfItems.textContent).toBe('0');



    // User adds item to basket
    const addItemToBasketButtons = getAllByText('+');

    fireEvent.click(addItemToBasketButtons[0]);
    expect(cartNumberOfItems.textContent).toBe('1');

    fireEvent.click(addItemToBasketButtons[0]);
    expect(cartNumberOfItems.textContent).toBe('2');

    fireEvent.click(addItemToBasketButtons[1]);
    expect(cartNumberOfItems.textContent).toBe('3');



    // User removes item from basket
    const removeItemFromBasketButtons = getAllByText('-');

    fireEvent.click(removeItemFromBasketButtons[0]);
    expect(cartNumberOfItems.textContent).toBe('2');

    fireEvent.click(removeItemFromBasketButtons[0]);
    expect(cartNumberOfItems.textContent).toBe('1');

    // Check that quantity of an item within the basket cannot be less than 0
    fireEvent.click(removeItemFromBasketButtons[0]);
    expect(cartNumberOfItems.textContent).toBe('1');



    fireEvent.click(addItemToBasketButtons[2]);
    fireEvent.click(addItemToBasketButtons[2]);
    // User can proceed to checkout
    const checkoutButton = getByText('Checkout');
    expect(checkoutButton).toBeInTheDocument();

    expect(getByRole('heading').textContent).not.toBe('Checkout');
    fireEvent.click(checkoutButton);
    expect(getAllByRole('heading')[1].textContent).toBe('Checkout');


    // User can see the cart items in checkout
    expect(getAllByRole('listitem').length).toBe(2);
    expect(getAllByRole('listitem')[0].textContent).toBe('book: 2eur x 1 = 2eur');
    expect(getAllByRole('listitem')[1].textContent).toBe('phone: 24eur x 2 = 48eur');

    // User can see the total price of the cart
    expect(getByTestId('total-price').textContent).toBe('50eur');
  });

  it('should render an error if there is a problem fetching data', async () => {
    mockFetch.mockRejectedValueOnce({status: 500});

    const history = createMemoryHistory();
    const route = '/products';
    history.push(route);
    const { findByText } = render(
      <Router history={history}>
        <ShoppingCart />
      </Router>
    );

    const errorView = await findByText('Something went wrong...');
    expect(errorView).toBeInTheDocument();
  });

});
