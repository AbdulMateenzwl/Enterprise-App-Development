const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true, // Add this option
    useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.json());

app.get('/api/test', (req, res) => {
    res.status(200).send('Backend Working'); // Fix the order of req, res and set status before send
});

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
