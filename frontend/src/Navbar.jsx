function Navbar({ onLogout }) {
  return (
    <nav className="navbar">

      <div className="navbar-left">
        <div>
          <h1 className="navbar-title">StockFlow</h1>
          <p className="navbar-subtitle">Inventory Manager</p>
        </div>
      </div>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>

    </nav>
  );
}

export default Navbar;
