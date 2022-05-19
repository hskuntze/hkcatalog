import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { Link } from 'react-router-dom';
import './styles.css';

const List = () => {
  const product = {
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
        id: 1,
        name: 'Books',
      },
      {
        id: 3,
        name: 'Computers',
      },
      {
        id: 4,
        name: 'Cellphones',
      },
    ],
  };

  return (
    <>
      <div className="product-crud">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-add">
            ADICIONAR
          </button>
        </Link>
        <div className="base-card search-bar">Search Bar</div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-12">
          <ProductCrudCard product={product} />
        </div>
        <div className="col-sm-6 col-md-12">
          <ProductCrudCard product={product} />
        </div>
        <div className="col-sm-6 col-md-12">
          <ProductCrudCard product={product} />
        </div>
        <div className="col-sm-6 col-md-12">
          <ProductCrudCard product={product} />
        </div>
      </div>
    </>
  );
};

export default List;
