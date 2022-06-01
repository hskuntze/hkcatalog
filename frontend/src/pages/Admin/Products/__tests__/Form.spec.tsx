import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CustomRouter } from 'CustomRouter';
import { useParams } from 'react-router-dom';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import history from 'util/navigate';
import Form from '../Form';
import { productResponse, server } from './fixtures';
import { ToastContainer } from 'react-toastify';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Create Form tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      productId: 'create',
    });
  });

  test('should render toast and redirect when submit successfully', async () => {
    render(
      <CustomRouter history={history}>
        <ToastContainer />
        <Form />
      </CustomRouter>
    );

    const nameInput = screen.getByTestId('name');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const priceInput = screen.getByTestId('price');
    //Para selecionar o input de 'select' temos de utilizar um
    //"label". Importante associar o 'select' ao 'label' através
    //do 'inputId' como metadado do 'select'
    const categoriesInput = screen.getByLabelText('Categorias');
    const submitButton = screen.getByRole('button', { name: /salvar/i });

    await selectEvent.select(categoriesInput, ['Computers', 'Art']);
    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '500.15');
    userEvent.type(
      imgUrlInput,
      'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg'
    );
    userEvent.type(descriptionInput, 'Computadorzão bacana pra você');
    userEvent.click(submitButton);

    await waitFor(() => {
      const toastElement = screen.getByText('Sucesso');
      expect(toastElement).toBeInTheDocument();
    });

    expect(history.location.pathname).toEqual('/admin/products');
  });

  test('should render five validation errors when clicking submit', async () => {
    render(
      <CustomRouter history={history}>
        <Form />
      </CustomRouter>
    );

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const messages = screen.getAllByText('Campo obrigatório');
      expect(messages).toHaveLength(5);
    });
  });

  test('should clear validation messages when filling out form', async () => {
    render(
      <CustomRouter history={history}>
        <Form />
      </CustomRouter>
    );

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const messages = screen.getAllByText('Campo obrigatório');
      expect(messages).toHaveLength(5);
    });

    const nameInput = screen.getByTestId('name');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const priceInput = screen.getByTestId('price');
    //Para selecionar o input de 'select' temos de utilizar um
    //"label". Importante associar o 'select' ao 'label' através
    //do 'inputId' como metadado do 'select'
    const categoriesInput = screen.getByLabelText('Categorias');

    await selectEvent.select(categoriesInput, ['Computers', 'Art']);
    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '500.15');
    userEvent.type(
      imgUrlInput,
      'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg'
    );
    userEvent.type(descriptionInput, 'Computadorzão bacana pra você');

    await waitFor(() => {
      const messages = screen.queryAllByText('Campo obrigatório');
      expect(messages).toHaveLength(0);
    });
  });
});

describe('Edit Form tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      productId: '1',
    });
  });

  test('should render toast and redirect when submit successfully', async () => {
    render(
      <CustomRouter history={history}>
        <ToastContainer />
        <Form />
      </CustomRouter>
    );

    await waitFor(() => {
      const nameInput = screen.getByTestId('name');
      const imgUrlInput = screen.getByTestId('imgUrl');
      const descriptionInput = screen.getByTestId('description');
      const priceInput = screen.getByTestId('price');

      const formElement = screen.getByTestId('form');

      expect(nameInput).toHaveValue(productResponse.name);
      expect(imgUrlInput).toHaveValue(productResponse.imgUrl);
      expect(descriptionInput).toHaveValue(productResponse.description);
      expect(priceInput).toHaveValue(String(productResponse.price));

      const ids = productResponse.categories.map((x) => String(x.id));
      expect(formElement).toHaveFormValues({ categories: ids });
    });

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      const toastElement = screen.getByText('Sucesso');
      expect(toastElement).toBeInTheDocument();
    });

    expect(history.location.pathname).toEqual('/admin/products');
  });
});
