import { BrowserRouter, Routes as Switch, Route, Navigate } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Catalog from 'pages/Catalog';
import Admin from 'pages/Admin';
import ProductDetails from 'pages/ProductDetails';

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={<Catalog />}/>
          <Route path="/admin/*" element={<Admin />}/>
          <Route path="/admin" element={<Navigate replace to="/admin/products"/>} />
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
