// Backend/server.js
const http = require("http");
const app = require("./app");

// Load environment variables
const port = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
