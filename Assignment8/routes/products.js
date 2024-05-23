const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Create Product
router.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).send('Product created');
});

// Get All Products
router.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Get Single Product
router.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

// Update Product
router.put('/products/:id', async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send('Product updated');
});

// Delete Product
router.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send('Product deleted');
});

module.exports = router;
