import { useState } from "react";

function Suppliers({ suppliers, setSuppliers, products }) {
  const [name, setName] = useState("");
// Add function
  const addSupplier = async () => {
    try {
      const trimmedName = name.trim();
      if (!trimmedName) {
        alert("Supplier name required");
        return;
      }
      const exists = suppliers.some(
        s => s.name.toLowerCase() === trimmedName.toLowerCase()
      );
      if (exists) {
        alert("Supplier already exists");
        return;
      }
      const res = await fetch("http://localhost:5000/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: trimmedName })
      });
      if (!res.ok) {
        alert("Error adding supplier");
        return;
      }
      const data = await res.json();
      setSuppliers(prev => [...prev, data]);
      setName("");
    } catch (err) {
      console.error(err);
      alert("Error while adding supplier");
    }
  };
// Delete function
  const deleteSupplier = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;
      if (products.some(p => p.supplierId === id)) {
        return alert("Supplier is used in products");
      }
      const res = await fetch(`http://localhost:5000/suppliers/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        alert("Error deleting supplier");
        return;
      }
      setSuppliers(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error while deleting supplier");
    }
  };

  return (
    <div>
      <h2 className="suppliers-title">Suppliers</h2>
      <div className="form-row">
        <input
          type="text"
          placeholder="Supplier Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
        <button className="add-btn" onClick={addSupplier}>
          Add Supplier
        </button>
      </div>
      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th className="align-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td className="align-right">
                  <button
                    className="delete-btn"
                    onClick={() => deleteSupplier(s._id)}
                  >
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

export default Suppliers;