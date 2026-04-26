import React from "react";

function TopSelling({ products }) {
  const topSelling = [...products]
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 3);

  return ( <div style={{ background: "#fff",  borderRadius: "10px" }}>
      {/* <h2><i>...Top Selling Products...</i></h2> */}
      <p className="card-label">Top Selling Products</p>
      {topSelling.map((item) => ( <div key={item._id}>
          <h4>{item.name}</h4>
        </div>
      ))}
    </div>
  );
}

export default TopSelling;