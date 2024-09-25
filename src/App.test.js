import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../src/Pages/HomePage/Home'; 

test('renders Home', () => {
  render(<Home />);
  const headingElement = screen.getByText(/welcome to entertainment guild/i); // 'i' makes it case-insensitive
  expect(headingElement).toBeInTheDocument();
});
