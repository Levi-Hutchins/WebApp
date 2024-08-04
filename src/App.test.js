import { render, screen } from '@testing-library/react';
import Home from '../src/Pages/Home'; 

test('renders HOME heading', () => {
  render(<Home />);
  const headingElement = screen.getByText(/HOME/);
  expect(headingElement).toBeInTheDocument();
});
