const express = require('express');
const request = require('request');

const app = express();
const PORT = 3000;

// Proxy endpoint to remove restrictive headers
app.get('/proxy', (req, res) => {
  const url = req.query.url; // Get the target URL from query parameters

  // Send a GET request to the target URL
  request.get({ url, headers: { 'User-Agent': 'Mozilla/5.0' } })
    .on('response', (response) => {
      // Remove headers that prevent embedding
      delete response.headers['x-frame-options'];
      delete response.headers['content-security-policy'];
    })
    .pipe(res); // Pipe the response back to the client
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
