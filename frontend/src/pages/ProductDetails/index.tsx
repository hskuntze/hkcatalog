import './styles.css';
import { ReactComponent as ArrowIcon } from 'assets/images/Seta.svg';
import ProductPrice from 'components/ProductPrice';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from 'types/product';
import axios from 'axios';
import { BASE_URL } from 'util/requests';
import ProductInfoLoader from './ProductInfoLoader';
import ProductDetailsLoader from './ProductDetailsLoader';

type UrlParams = {
  productId: string;
};

const ProductDetails = () => {
  const { productId } = useParams<UrlParams>();

  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 'useEffect' recebe duas dependências: uma função e uma lista de dependências.
   * A função é executada por padrão quando o componente é montado, e é executada
   * novamente quando alguma das dependências for alterada.
   */
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <div className="product-details-container">
      <div className="base-card products-details-card">
        <Link to="/products">
          <div className="goback-container">
            <ArrowIcon />
            <h5>VOLTAR</h5>
          </div>
        </Link>
        <div className="row">
          <div className="col-xl-6">
            {isLoading ? (
              <ProductInfoLoader />
            ) : (
              <>
                <div className="img-container">
                  <img src={product?.imgUrl} alt={product?.name} />
                </div>
                <div className="nameprice-container">
                  <h1>{product?.name}</h1>
                  {product && <ProductPrice price={product?.price} />}
                </div>
              </>
            )}
          </div>
          <div className="col-xl-6">
            {isLoading ? (
              <ProductDetailsLoader />
            ) : (
              <div className="description-container">
                <h6>Descrição do Produto</h6>
                <p>{product?.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
