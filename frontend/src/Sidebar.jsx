
function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sidebar">
      
      <div className="sidebar-menu">
        
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`sidebar-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`sidebar-btn ${activeTab === 'products' ? 'active' : ''}`}
        >
          Products
        </button>

        <button
          onClick={() => setActiveTab('suppliers')}
          className={`sidebar-btn ${activeTab === 'suppliers' ? 'active' : ''}`}
        >
          Suppliers
        </button>

      </div>

    </div>
  );
}

export default Sidebar;