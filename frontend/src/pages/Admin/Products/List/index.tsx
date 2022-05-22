import { AxiosRequestConfig } from 'axios';
import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import './styles.css';

const List = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  
  const getProducts = () => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: 0,
        size: 50,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="product-crud-container">
      <div className="product-crud">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-add">
            ADICIONAR
          </button>
        </Link>
        <div className="base-card search-bar">Search Bar</div>
      </div>
      <div className="row">
        {page?.content.map((product) => (
          <div className="col-sm-6 col-md-12" key={product.id}>
            <ProductCrudCard product={product} onDelete={() => getProducts()}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
