const http = require('http');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Create a PostgreSQL pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'parth10',
  port: 5432,
});

// Create a server
const server = http.createServer((req, res) => {
  // Set the response header
  res.setHeader('Content-Type', 'text/html');

  // Serve static files (HTML, CSS, JavaScript)
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        console.error('Error reading index.html:', err);
        res.writeHead(500);
        res.end('Internal Server Error');
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
  } else if (req.url === '/main.css') {
    fs.readFile(path.join(__dirname, 'main.css'), (err, data) => {
      if (err) {
        console.error('Error reading main.css:', err);
        res.writeHead(500);
        res.end('Internal Server Error');
      } else {
        res.setHeader('Content-Type', 'text/css');
        res.writeHead(200);
        res.end(data);
      }
    });
  } else if (req.url === '/script.js') {
    fs.readFile(path.join(__dirname, 'script.js'), (err, data) => {
      if (err) {
        console.error('Error reading script.js:', err);
        res.writeHead(500);
        res.end('Internal Server Error');
      } else {
        res.setHeader('Content-Type', 'application/javascript');
        res.writeHead(200);
        res.end(data);
      }
    });
  }
  // API endpoint to add item to cart
  else if (req.url === '/add-to-cart' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // Convert Buffer to string
    });
    req.on('end', () => {
      // Here you can parse the item data from the request body
      // and add it to the cart or perform any other necessary actions
      console.log('Item data received:', body);

      // Assuming you want to parse JSON data from the request body
      const itemData = JSON.parse(body);

      // Insert item data into the cart_items table
      const query = {
        text: 'INSERT INTO cart_items (product_id, quantity, price, supplier) VALUES ($1, $2, $3, $4)',
        values: [itemData.product_id, itemData.quantity, itemData.price, itemData.supplier]
      };

      pool.query(query, (err, result) => {
        if (err) {
          console.error('Error inserting item into cart_items:', err);
          res.writeHead(500);
          res.end('Internal Server Error');
        } else {
          console.log('Item added to cart_items:', result.rows[0]);
          res.writeHead(200);
          res.end('Item added to cart');
        }
      });
    });
  }
  // Handle other routes
  else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
