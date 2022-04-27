import './styles.css';
import { ReactComponent as ArrowIcon } from 'assets/images/Seta.svg';
import ProductPrice from 'components/ProductPrice';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
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
            <div className="img-container">
              <img
                src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg"
                alt="Nome do produto"
              />
            </div>
            <div className="nameprice-container">
              <h1>Nome do Produto</h1>
              <ProductPrice price={2500.0} />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
              <h6>Descrição do Produto</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis, ratione.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
