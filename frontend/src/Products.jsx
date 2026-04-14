import { useState } from "react";
function Products({ products, setProducts }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const addProduct = async () => {
    if (!name || !category || !stock || !price) {
      alert("Please fill all fields");
      return;
    }
    const newProduct = {
      name,
      category,
      stock: Number(stock),
      price: Number(price)
    };
    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });
    const data = await res.json();
    setProducts(prev => [...prev, data]);
    setName("");
    setCategory("");
    setStock("");
    setPrice("");
  };
  // DELETE
  const deleteProduct = async (id) => {
    try {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;
      await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE"
      });
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      
      <div className="products-header">
        <h2 className="products-title">All Products</h2>
      </div>
      <div className="form-row">
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)}  className="form-input"/>
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}  className="form-input"/>
        <input type="number" placeholder="Stock" value={stock}onChange={(e) => setStock(e.target.value)}  className="form-input"/>
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}  className="form-input"/>
        <button className="add-btn" onClick={addProduct}>Add Product</button>
      </div>

      <div className="table-container">
        <table className="products-table">
          
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th className="align-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="name">{product.name}</td>
                <td className="category">{product.category}</td>

                <td>
                  <span className={`stock ${product.stock < 15 ? 'low' : 'ok'}`}>
                    {product.stock}
                  </span>
                </td>

                <td className="price">₹{product.price}</td>

                <td className="align-right">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn" onClick={() => deleteProduct(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Products;