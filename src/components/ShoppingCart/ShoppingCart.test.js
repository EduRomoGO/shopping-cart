import React from 'react';
import { render } from '@testing-library/react';
import ShoppingCart from './ShoppingCart.js';

test('renders learn react link', () => {
  const { getByText } = render(<ShoppingCart />);
  const linkElement = getByText('Shopping Cart');
  expect(linkElement).toBeInTheDocument();
});
