const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Order with a single product ID
router.post('/orders', auth, async (req, res) => {
    try {
        const { productId } = req.body;

        // Fetch the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send(`Product with id ${productId} not found`);
        }

        // Calculate total amount assuming quantity is 1
        const totalAmount = product.price;

        // Create a new order
        const newOrder = new Order({
            user: req.user.id,
            products: [{ product: productId, quantity: 1 }],
            totalAmount
        });

        // Save the order to the database
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get All Orders (Admin)
router.get('/orders', auth, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const orders = await Order.find().populate('user products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get User's Orders
router.get('/orders/user', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Order Status (Admin)
router.put('/orders/:id', auth, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
