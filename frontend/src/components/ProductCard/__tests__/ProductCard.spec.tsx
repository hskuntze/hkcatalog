import { render, screen } from '@testing-library/react';
import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { Product } from 'types/product';
import ProductCard from '..';

test('should render ProductCard', () => {
  const product: Product = {
    id: 1,
    name: 'Smart Watch',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, porro.',
    imgUrl: 'https://google.com',
    price: 1500.5,
    categories: [
      {
        id: 2,
        name: 'Electronics',
      },
    ],
    date: String(Date.now()),
  } as Product;

  render(<ProductCard product={product} />);

  expect(screen.getByText(product.name)).toBeInTheDocument();
  expect(screen.getByAltText(product.name)).toBeInTheDocument();
  expect(screen.getByText('R$')).toBeInTheDocument();
  expect(screen.getByText('1.500,50')).toBeInTheDocument();
});
