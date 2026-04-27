import Chart from './Chart.jsx';
import TopSelling from "./TopSelling.jsx";

function Dashboard({ products }) {

  if (products.length === 0) {
    return <p>No products yet</p>;
  }

  const totalProducts = products.length;

  const lowStockItems = products.filter(p => p.stock < 15).length;

  const totalValue = products.reduce(
    (sum, p) => sum + (p.price * p.stock),
    0
  );

  return (
    <div>
      <h2 className="dashboard-title">Welcome...</h2>
      <p className="dashboard-subtitle">
        Here's your inventory overview
      </p>

      <div className="dashboard-grid">
        
        <div className="card">
          <p className="card-label">Total Products</p>
          <p className="card-value">{totalProducts}</p>
        </div>

        <div className="card">
          <p className="card-label">Low Stock Items</p>
          <p className="card-value highlight">{lowStockItems}</p>
        </div>

        <div className="card">
          <p className="card-label">Total Value</p>
          <p className="card-value">₹{totalValue}</p>
        </div>

        <div className="card">
          <TopSelling products={products} />
        </div>
      </div>
      <Chart products={products} />
    </div>
  );
}

export default Dashboard;
