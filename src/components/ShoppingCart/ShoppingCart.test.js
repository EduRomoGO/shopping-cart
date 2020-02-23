import React from 'react';
import { render, cleanup } from '@testing-library/react';
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

    const { getByText, findAllByRole, findByRole, getByTestId } = render(<ShoppingCart />);

    const appTitle = getByText('Shopping Cart');
    expect(appTitle).toBeInTheDocument();



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
  });

  it('should render an error if there is a problem fetching data', async () => {
    mockFetch.mockRejectedValueOnce({status: 500});

    const { findByText } = render(<ShoppingCart />);

    const errorView = await findByText('Something went wrong...');
    expect(errorView).toBeInTheDocument();
  });

});
