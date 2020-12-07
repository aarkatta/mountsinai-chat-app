import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders chat room title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Super Slick Chat Room/i);
  expect(titleElement).toBeInTheDocument();
});
