import React from 'react';
import { render } from '@testing-library/react';
import ShoppingCart from './ShoppingCart.js';
import { mockFetch } from '../../utils/mocks/mockFetch.js'
import { products } from '../../utils/mocks/mocks.js'

jest.mock('../../utils/mocks/mockFetch.js');

afterEach(() => {
  jest.resetAllMocks()
});

describe('Shopping Cart', () => {

  test('renders learn react link', () => {
    mockFetch.mockResolvedValueOnce(products);
    expect(mockFetch).toHaveBeenCalledTimes(1);


    const { getByText } = render(<ShoppingCart />);

    const linkElement = getByText('Shopping Cart');
    expect(linkElement).toBeInTheDocument();

    // Check that it fetches data
    // Mock data provider

    // Check data provider is called
    // Check that list of items is printed in the screen
    // Check loading view is shown while loading data
    // Check that error view is shown when error happens


  });

});
