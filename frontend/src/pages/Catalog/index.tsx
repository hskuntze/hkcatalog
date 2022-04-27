import ProductCard from 'components/ProductCard';
import {Product} from 'types/product';

function Catalog() {

  const product : Product = {
    "id": 1,
    "name": "The Lord of the Rings",
    "price": 90.5,
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "imgUrl": "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg",
    "date": "2020-07-13T20:50:07.123450Z",
    "categories": [
        {
            "id": 2,
            "name": "Electronics"
        }
    ]
}

  return (
    <div className="my-3 container">
      <div className="row">
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product}/>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product}/>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product}/>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product}/>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product}/>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product}/>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
