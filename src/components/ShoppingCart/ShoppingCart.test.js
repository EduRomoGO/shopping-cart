import React from 'react';
import { render, cleanup, fireEvent, within } from '@testing-library/react';
import ShoppingCart from './ShoppingCart.js';
import { mockFetch } from '../../utils/mocks/mockFetch.js'
import { products } from '../../utils/mocks/mocks.js'

jest.mock('../../utils/mocks/mockFetch.js');

afterEach(() => {
  cleanup();
  jest.resetAllMocks()
});

describe('Shopping Cart', () => {

  it('renders correctly', async () => {
    mockFetch.mockResolvedValueOnce(products);

    const { getByRole, getByText, getAllByText, findAllByRole, findByRole, getByTestId } = render(<ShoppingCart />);

    const appTitle = getByText('Shopping Cart');
    expect(appTitle).toBeInTheDocument();

    const cartNumberOfItems = getByTestId('cartItemsNumber');
    expect(cartNumberOfItems).toBeInTheDocument();
    expect(cartNumberOfItems.textContent).toBe('0');


    // Component starts loading data
    const loadingView = getByTestId('loader');
    expect(loadingView).toBeInTheDocument();

    expect(mockFetch).toHaveBeenCalledTimes(1);



    // Components shows data fetched and hides loader
    const productNodesList = await findByRole('list');
    expect(productNodesList).toBeInTheDocument();

    const productNodes = await findAllByRole('listitem');
    expect(productNodes.length).toEqual(products.length);

    expect(loadingView).not.toBeInTheDocument();



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



    // User can proceed to checkout
    const checkoutButton = getByText('Checkout');
    expect(checkoutButton).toBeInTheDocument();

    const heading = getByRole('heading');
    expect(heading.textContent).not.toBe('Checkout');
    fireEvent.click(checkoutButton);
    // expect()
  });

  it('should render an error if there is a problem fetching data', async () => {
    mockFetch.mockRejectedValueOnce({status: 500});

    const { findByText } = render(<ShoppingCart />);

    const errorView = await findByText('Something went wrong...');
    expect(errorView).toBeInTheDocument();
  });

});
