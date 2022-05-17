import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';
import './styles.css';
import Users from './User';
import PrivateRoute from 'components/PrivateRoute';

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
            path="products"
            element={
              <PrivateRoute roles={['ROLE_OPERATOR']}>
                <h1>Produtos</h1>
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
