import './styles.css';

function Navbar() {
  return (
    <nav className="adm-nav-container">
      <ul className="admin-nav-ul">
        <li>
          <a href="link" className="adm-nav-item active">
            <p>Produtos</p>
          </a>
        </li>
        <li>
          <a href="link" className="adm-nav-item">
            <p>Categorias</p>
          </a>
        </li>
        <li>
          <a href="link" className="adm-nav-item">
            <p>Usuários</p>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
