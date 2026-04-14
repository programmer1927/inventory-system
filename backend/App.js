const express = require('express');
const cors = require('cors');
const exp = express();
exp.use(cors());
exp.use(express.json());
let products = [];

//GET
exp.get('/products', (req,res) => {
    res.json(products);
});
exp.get('/products/:id', (req,res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    const product = products.find(product => product.id === id);
    if(!product) {
        return res.status(404).json({message: `Product with id: ${id} not found`});
    }
    res.json(product);
});

//POST
let id = 1;
exp.post('/products', (req,res) => {
    const product = {
        id : id++,
        ...req.body
    };
    products.push(product);
    res.json(product);
});

//DELETE
exp.delete('/products/:id', (req,res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    const product = products.find(product => product.id === id);
    if(!product) {
       return res.status(404).json({message: `Product with id: ${id} not found`});
    }
    products = products.filter(product => product.id !== id);
    res.json({message: `Product with id: ${id} deleted`});
});

// PUT
exp.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
        return res.status(404).json({ message: `Product with id: ${id} not found` });
    }
    const updatedProduct = {
        id: id,
        ...req.body
    };
    products[index] = updatedProduct;
    res.json(updatedProduct);
});
// PATCH
exp.patch('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    const product = products.find(product => product.id === id);
    if (!product) {
        return res.status(404).json({ message: `Product with id: ${id} not found` });
    }
    Object.assign(product, req.body);
    res.json(product);
});

exp.listen(5000, () => {
    console.log("Server running on port 5000")
});