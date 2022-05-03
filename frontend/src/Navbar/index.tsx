import './styles.css';
import 'bootstrap/js/src/collapse.js';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav className="bg-primary navbar navbar-dark navbar-expand-md main-nav">
        <div className="container-fluid">
          <Link to="/" className="nav-logo-text">
            <h4>HK Catalog</h4>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#catalog-navbar"
            aria-controls="catalog-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="catalog-navbar">
            <ul className="navbar-nav offset-md-2 main-menu">
              <li>
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? 'white' : '#e5e5e5',
                  })}
                >
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  style={({ isActive }) => ({
                    color: isActive ? 'white' : '#e5e5e5',
                  })}
                >
                  CATALOGO
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin"
                  style={({ isActive }) => ({
                    color: isActive ? 'white' : '#e5e5e5',
                  })}
                >
                  ADMIN
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
