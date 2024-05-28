const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv").config();
const openaiRoutes = require("./routes/openaiRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.send("hello Backend");
});
app.use("/api", openaiRoutes);

// Get the port from the environment variable or default to 4000
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle errors
app.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
