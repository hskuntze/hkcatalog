import './styles.css';
import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import CategoryBadge from '../CategoryBadge';

type Props = {
  product: Product;
};

function ProductCrudCard({ product }: Props) {
  return (
    <>
      <div className="base-card product-crud-card">
        <div className="top-crud-card">
          <img src={product.imgUrl} alt={product.name} />
        </div>
        <div className="info-container">
          <div className="bottom-crud-card">
            <h6>{product.name}</h6>
            <ProductPrice price={product.price} />
          </div>
          <div className="categories-container">
            {product.categories.map((c) => (
              <CategoryBadge name={c.name} key={c.id} />
            ))}
          </div>
        </div>
        <div className="crud-buttons-container">
          <button className="btn btn-outline-danger crud-button me-1 me-md-0 mt-md-4">EXCLUIR</button>
          <button className="btn btn-outline-secondary crud-button">EDITAR</button>
        </div>
      </div>
    </>
  );
}

export default ProductCrudCard;
