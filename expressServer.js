// Express
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const prerenderIO = require('prerender-node');

const PORT = 3000;

const STATIC = path.resolve(__dirname, 'build');
const INDEX = path.resolve(STATIC, 'index.html');

const app = express();

// web crawlers get pre-rendered / cached site, for SEO purposes.
app.use(prerenderIO.set('prerenderToken', '9p5pJvs6jaM8NsCnllsU'));


app.use(bodyParser.json());

// Static content
app.use(express.static(STATIC));

// All GET request handled by INDEX file
app.get('*', function (req, res) {
  res.sendFile(INDEX);
});

// Start server
app.listen(PORT, function () {
  console.log('Server up and running on ', `http://localhost:${PORT}/`);
});