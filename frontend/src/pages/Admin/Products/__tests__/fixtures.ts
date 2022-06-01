import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL } from 'util/requests';

const findAllCategories = {
  content: [
    {
      id: 15,
      name: 'Accessories',
    },
    {
      id: 17,
      name: 'Art',
    },
    {
      id: 23,
      name: 'Baby',
    },
    {
      id: 18,
      name: 'Beauty',
    },
    {
      id: 5,
      name: 'Beverages',
    },
    {
      id: 1,
      name: 'Books',
    },
    {
      id: 12,
      name: 'Cars',
    },
    {
      id: 3,
      name: 'Computers',
    },
    {
      id: 9,
      name: 'Construction',
    },
    {
      id: 16,
      name: 'Education',
    },
  ],
  pageable: {
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 10,
    paged: true,
    unpaged: false,
  },
  last: false,
  totalPages: 3,
  totalElements: 24,
  size: 10,
  number: 0,
  sort: {
    sorted: true,
    unsorted: false,
    empty: false,
  },
  first: true,
  numberOfElements: 10,
  empty: false,
};

export const productResponse = {
  id: 2,
  name: 'Smart TV',
  price: 2190.0,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  imgUrl:
    'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg',
  date: '2020-07-14T10:00:00Z',
  categories: [
    {
      id: 2,
      name: 'Electronics',
    },
    {
      id: 3,
      name: 'Computers',
    },
  ],
};

export const server = setupServer(
  // Describe the requests to mock.
  rest.get(`${BASE_URL}/categories`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(findAllCategories));
  }),
  rest.post(`${BASE_URL}/products`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(productResponse));
  }),
  rest.put(`${BASE_URL}/products/:productId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productResponse));
  }),
  rest.get(`${BASE_URL}/products/:productId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productResponse));
  })
);
