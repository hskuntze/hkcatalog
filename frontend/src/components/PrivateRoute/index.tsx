import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from 'util/requests';

const PrivateRoute = ( children : any) => {
  const auth = isAuthenticated();
  return auth ? <Outlet /> : <Navigate replace to="/admin/auth" />;
};

export default PrivateRoute;
