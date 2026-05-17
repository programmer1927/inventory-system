import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import Dashboard from './Dashboard.jsx';
import Products from './Products.jsx';
import Suppliers from './Suppliers.jsx';

function HomePage({ onLogout, token }) {  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  //fetch for products
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);
  //fetch for suppliers
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/suppliers`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(err => console.log(err));
  }, []);
    return(<>
      <div style={{minHeight: '100vh',backgroundColor: '#DDEEDB', fontFamily: 'Arial, sans-serif' }}>
      <Navbar onLogout={onLogout} />
      <div style={{ display: 'flex', width: '100%' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ flex: 1, padding: '32px', minWidth: 0, overflow: 'hidden'}}>
      {activeTab === 'dashboard' && <Dashboard products={products} />}
      {activeTab === 'products'&& <Products products={products} setProducts={setProducts} suppliers = {suppliers} token = {token}/>}
      {activeTab === 'suppliers' && <Suppliers suppliers={suppliers} setSuppliers={setSuppliers} products = {products} token = {token}/>}
      </div>
    </div>

    </div>
    </>
    );
}

export default HomePage
