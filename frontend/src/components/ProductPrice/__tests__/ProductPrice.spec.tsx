import { render, screen } from '@testing-library/react';
import { formatPrice } from 'util/formatters';
import ProductPrice from '..';

test('should render ProductPrice', () => {
  const cifrao = 'R$';
  const price = 125.5;

  render(<ProductPrice price={price} />);

  expect(screen.getByText(cifrao)).toBeInTheDocument();
  expect(screen.getByText('125,50')).toBeInTheDocument();
});
