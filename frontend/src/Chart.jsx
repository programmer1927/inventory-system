function Chart({ products }) {

  if (!products || products.length === 0) {
    return <p>No data</p>;
  }

  const maxStock = Math.max(...products.map(p => p.stock)) || 1;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Stock Overview</h3>
      <div className="chart-legend">
        <span className="legend-item high">High</span>
        <span className="legend-item medium">Medium</span>
        <span className="legend-item low">Low</span>
      </div>
      <div className="chart">
        {products.map(product => {const height = (product.stock / maxStock) * 200; 

          return (
            <div className="bar-wrapper" key={product._id}>
                
              <div className={`bar ${product.stock < 15 ? 'low' : product.stock < 30 ? 'medium' : 'high' }`} style={{ height: `${height}px` }}>

              </div>

              <p className="bar-label">{product.name}</p>
              <p className="bar-value">{product.stock}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chart