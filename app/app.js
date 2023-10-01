//day 29

const express = require('express');
const app = express();
const port = 3000;

// Sample product data
const  products = [
    {
        id: 1,
        name: 'Product 1',
        price: 19.99,
        description: 'This is the description of Product 1.',
        path: '/public/images/adidas1.jpg'
    },
    {
        id: 2,
        name: 'Product 2',
        price: 29.99,
        description: 'This is the description of Product 2.',
        path: '/public/images/adidas2.jpg'   
    },
    // Add more products as needed
];

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// app.set('app', __dirname + '/app');


app.get('/', (req, res) => {
    res.render('home', { products });
});

app.get('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    const path = product.path;

    if (!product) {
        // Handle product not found
        res.status(404).send('Product not found');
    } else {
        res.render('productDetails', { product ,path});
    }
});

// day 30
app.use('/public', (req, res, next) => {
    res.header('Cache-Control', 'public, max-age=86400'); // Cache for one day (in seconds)
    const oneDayInSeconds = 86400;
    const expirationDate = new Date(Date.now() + oneDayInSeconds * 1000);
    res.header('Expires', expirationDate.toUTCString());
    next();
 });
 
app.use (express.static('app/', {maxAge: '5000'}));  // app/public/images

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
