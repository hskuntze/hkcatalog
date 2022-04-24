import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Catalog from 'pages/Catalog';
import Admin from 'pages/Admin';

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={<Catalog />}/>
          <Route path="/admin" element={<Admin />}/>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
