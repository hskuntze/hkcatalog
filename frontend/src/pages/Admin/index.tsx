import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';
import './styles.css';
import Users from './Users';
import PrivateRoute from 'components/PrivateRoute';
import Products from './Products';

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <Routes>
          <Route
            path="users"
            element={
              <PrivateRoute roles={['ROLE_ADMIN']}>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="products/*"
            element={
              <PrivateRoute roles={['ROLE_OPERATOR']}>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="categories"
            element={
              <PrivateRoute roles={['ROLE_OPERATOR']}>
                <h1>Categorias</h1>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
