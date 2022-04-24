import './styles.css';
import ProductImg from 'assets/images/product_img.png';
import ProductPrice from 'components/ProductPrice';

function ProductCard(){
    return(
        <>
            <div className='base-card product-card'>
                <div className='top-card'>
                    <img src={ProductImg} alt="Imagem do produto" />
                </div>
                <div className='bottom-card'>
                    <h6>Produto</h6>
                    <ProductPrice />
                </div>
            </div>
        </>
    );
}

export default ProductCard;