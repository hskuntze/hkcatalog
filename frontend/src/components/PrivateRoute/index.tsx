import Denied from 'pages/Admin/Denied';
import { Navigate, useLocation } from 'react-router-dom';
import { hasAnyRoles, isAuthenticated, Role } from 'util/requests';

const PrivateRoute = ({children, roles}:{children:JSX.Element; roles: Array<Role>;}) => {
  let location = useLocation();
  
  const hasRoles = hasAnyRoles(roles);

  if(!isAuthenticated()){
    return <Navigate replace to="/admin/auth" state={{from: location}} />;
  }

  if(isAuthenticated() && !hasRoles){
    return <Denied />;
  }

  return children;
};

export default PrivateRoute;