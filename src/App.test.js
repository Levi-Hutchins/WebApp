import { render, screen } from '@testing-library/react';
import Home from '../src/Pages/HomePage/Home'; 

test('renders Home', () => {
  render(<Home />);
  const headingElement = screen.getByText(/WELCOME/);
  expect(headingElement).toBeInTheDocument();
});
