import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import Dashboard from './Dashboard.jsx';
import Products from './Products.jsx';
import Suppliers from './Suppliers.jsx';

function HomePage(){
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  //fetch for products
  useEffect(() => {
    fetch("http://localhost:5000/products").then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);
  //fetch for suppliers
  useEffect(() => {
    fetch("http://localhost:5000/suppliers")
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(err => console.log(err));
  }, []);
    return(<>
        <div style={{minHeight: '100vh',backgroundColor: '#DDEEDB', fontFamily: 'Arial, sans-serif' }}>
    <Navbar />
  <div style={{ display: 'flex', width: '100%' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ flex: 1, padding: '32px', minWidth: 0, overflow: 'hidden'}}>
      {activeTab === 'dashboard' && <Dashboard products={products} />}
      {activeTab === 'products'&& <Products products={products} setProducts={setProducts} suppliers = {suppliers}/>}
      {activeTab === 'suppliers' && <Suppliers suppliers={suppliers} setSuppliers={setSuppliers} products = {products} />}
      </div>
    </div>

    </div>
    </>
    );
}

export default HomePage