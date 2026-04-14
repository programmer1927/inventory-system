import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import Dashboard from './Dashboard.jsx';
import Products from './Products.jsx';
import Suppliers from './Suppliers.jsx';

function HomePage(){
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  //   const products = [{id:1,name:"Wireless Headphones",category:"Electronics",stock:45,price:1199},{id:2,name:"Notebook Set",category:"Stationery",stock:118,price:199},{id:3,name:"Steel Water Bottle",category:"Accessories",stock:8,price:499},
  //   {id:4,name:"Pencil set",category:"Stationery",stock:72,price:20 },{id:5,name:"Sticky notes ",category:"Stationery",stock:36,price:49 },{id:2,name:" Hair pins",category:"Accessories",stock:14,price:40 }
  // ];
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

    return(<>
        <div style={{minHeight: '100vh',backgroundColor: '#DDEEDB', fontFamily: 'Arial, sans-serif' }}>
    <Navbar />
  <div style={{ display: 'flex', width: '100%' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ flex: 1, padding: '32px' }}>
      {activeTab === 'dashboard' && <Dashboard products={products} />}
      {activeTab === 'products' && <Products products={products} setProducts={setProducts} />}
      {activeTab === 'suppliers' && <Suppliers />}
      </div>
    </div>

    </div>
    </>
    );
}

export default HomePage