import { render, screen, waitFor } from '@testing-library/react';
import { CustomRouter } from 'CustomRouter';
import { server } from './fixtures';
import history from 'util/navigate';
import Catalog from '..';

describe('Catalog tests', () => {
  //Boilerplate de testes para servidor mockado
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  test('should render Catalog with products', async () => {
    render(
      <CustomRouter history={history}>
        <Catalog />
      </CustomRouter>
    );

    expect(screen.getByText('Catálogo de Produtos')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Smart TV')).toBeInTheDocument();
    });
  });
});
