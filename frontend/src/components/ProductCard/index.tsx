import './styles.css';
import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';

type Props = {
    product : Product;
}

function ProductCard({ product } : Props){
    return(
        <>
            <div className='base-card product-card'>
                <div className='top-card'>
                    <img src={product.imgUrl} alt={product.name} />
                </div>
                <div className='bottom-card'>
                    <h6>{product.name}</h6>
                    <ProductPrice price={product.price}/>
                </div>
            </div>
        </>
    );
}

export default ProductCard;