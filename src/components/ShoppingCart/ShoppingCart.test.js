import React from 'react';
import { render, findByRole } from '@testing-library/react';
import ShoppingCart from './ShoppingCart.js';
import { mockFetch } from '../../utils/mocks/mockFetch.js'
import { products } from '../../utils/mocks/mocks.js'

jest.mock('../../utils/mocks/mockFetch.js');

afterEach(() => {
  jest.resetAllMocks()
});

describe('Shopping Cart', () => {

  it('renders correctly', async () => {
    mockFetch.mockResolvedValueOnce(products);

    const { getByText, findAllByRole, findByRole } = render(<ShoppingCart />);

    expect(mockFetch).toHaveBeenCalledTimes(1);

    const productNodesList = await findByRole('list');
    expect(productNodesList).toBeInTheDocument();

    const productNodes = await findAllByRole('listitem');
    expect(productNodes.length).toEqual(products.length);


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
