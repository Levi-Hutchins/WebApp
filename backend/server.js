const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const  {searchProducts}  = require('./ProductQueries');

const green = '\x1b[32m';
const reset = '\x1b[0m';

require('dotenv').config();

const app = express();
const port =4000;



app.use(cors());

app.use(bodyParser.json());

app.post('/api/search', async (req, res) => {
  var product = req.body.product;
  console.log("[INFO] Searching for ",product)

  try {
    const result = await searchProducts(product);
    console.log("[INFO] Returning data ")

    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error executing query');
  }
});
app.get('/api', async (req, res) => {
  console.log(`${green}[INFO] -> GET /api - Health Status${reset}`);
  res.status(200).send('Running')
})

app.listen(port, () => {
  console.log(`${green}[INFO] -> Server now running on port ${port}${reset}`);
});
