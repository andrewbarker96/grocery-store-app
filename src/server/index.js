var express = require('express');
var fetchGroceryItems = require('./groceryItems');

var app = express();
var port = 3000;

app.use(express.json());

// Route to fetch grocery items from MongoDB
app.get('/groceryItems', async(req, res) => {
  try {
    // Fetch grocery items from MongoDB
    const groceryItems = await fetchGroceryItems();

    // Send the fetched data as JSON response
    res.json(groceryItems);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
