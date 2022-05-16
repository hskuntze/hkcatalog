import { NavLink } from 'react-router-dom';
import { hasAnyRoles } from 'util/requests';
import './styles.css';

function Navbar() {
  return (
    <nav className="adm-nav-container">
      <ul className="admin-nav-ul">
        <li>
          <NavLink to="/admin/products" className="adm-nav-item">
            <p>Produtos</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" className="adm-nav-item">
            <p>Categorias</p>
          </NavLink>
        </li>
        { hasAnyRoles(['ROLE_ADMIN']) && (
          <li>
            <NavLink to="/admin/users" className="adm-nav-item">
              <p>Usuários</p>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
