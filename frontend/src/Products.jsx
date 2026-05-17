import { useState } from "react";
import TimelineChart from "./TimelineChart";
function Products({ products, setProducts, suppliers, token }) {
  // Product detail states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  // For managing stock movement
  const [selectedProductId, setSelectedProductId] = useState(null);
  // For editing
  const [editingId, setEditingId] = useState(null);
  // Function to ADD
  const validateProduct = () => {
    const trimmedName = name.trim();
    const trimmedCategory = category.trim();
    if (!trimmedName) {
      alert("Product name required");
      return false;
    }
    if (!trimmedCategory) {
      alert("Category required");
      return false;
    }
    if (!Number.isFinite(Number(stock)) || Number(stock) < 0) {
      alert("Invalid stock");
      return false;
    }
    if (!Number.isFinite(Number(price)) || Number(price) < 0) {
      alert("Invalid price");
      return false;
    }
    if (!supplier) {
      alert("Select supplier");
      return false;
    }
    return true;
  };
  const addProduct = async () => {
    if(!validateProduct())
      return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name.trim(),
        category: category.trim(),
        stock: Number(stock),
        price: Number(price),
        supplierId: supplier
      })
      });
    if (!res.ok) {
      throw new Error("Failed to add product");
    }
    const data = await res.json();
    setProducts(prev => [...prev, data]);
    setName("");
    setCategory("");
    setStock("");
    setPrice("");
    setSupplier("");

  } catch (err) {
    console.error(err);
    alert("Error adding product");
  }
  };
  // Function to DELETE
  const deleteProduct = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) {
        alert("Failed to delete product");
        return;
      }
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.log(err);
      alert("Error deleting product");
    }
  };
  // Functions to PATCH
  const startEdit = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setCategory(product.category);
    setStock(product.stock);
    setPrice(product.price);
    setSupplier(product.supplierId);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const handleUpdate = async () => {
    if(!validateProduct())
      return;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${editingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({
        name: name.trim(),
        category: category.trim(),
        stock: Number(stock),
        price: Number(price),
        supplierId: supplier
      })
    });
    if (!res.ok) {
      alert("Update failed");
      return;
    }
    const updatedProduct = await res.json();
    setProducts(prev =>
      prev.map(p => (p._id === editingId ? updatedProduct : p))
    );
    setEditingId(null);
    setName("");
    setCategory("");
    setStock("");
    setPrice("");
    setSupplier("");

  } catch (err) {
    console.error(err);
    alert("Error while updating");
  }
};
const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setCategory("");
    setStock("");
    setPrice("");
    setSupplier("");
};
  // Actual Interface
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
        <select value={supplier} onChange={(e) => setSupplier(e.target.value)} className="form-input">
          <option value="">Select Supplier</option>
          {suppliers?.map(s => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        <button className="add-btn" onClick={editingId ? handleUpdate : addProduct}>
          {editingId ? "Update Product" : "Add Product"}
        </button>

      </div>

      <div className="table-container">
        <table className="products-table">
          
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Supplier</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => ([
              <tr key={product._id} className={editingId === product._id ? "editing-row" : ""}>
                <td className="name">{product.name}</td>
                <td className="category">{product.category}</td>
                <td>
                  <span className={`stock ${product.stock < 15 ? 'low' : 'ok'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className ="price">₹{product.price}</td>

                <td>{suppliers.find(s => s._id === product.supplierId)?.name || "Unknown"}</td>

                <td className ="action-cell">
                  <button className ="edit-btn" onClick={() => startEdit(product)}>
                    Edit
                  </button>
                  {editingId === product._id  && (
                    <button className ="delete-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  )}
                  <button className ="delete-btn" onClick={() => deleteProduct(product._id)}>
                    Delete
                  </button>
                  <button className="timeline-btn" onClick={() => setSelectedProductId(selectedProductId === product._id ? null : product._id)}>
                    Timeline
                  </button>
                </td>
              </tr>,
              selectedProductId === product._id && (
                <tr key={product._id + "-timeline"}>
                  <td colSpan="6">
                    <TimelineChart productId={product._id} currentStock={product.stock}/>
                  </td>
                </tr>
              )
            ]))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Products;