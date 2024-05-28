const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const openaiRoutes = require("./routes/openaiRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", (req, res) => {
  res.send("Hello Test");
});
app.use("/api", openaiRoutes);


// Start server
app.listen(port, () => console.log(`Server running on port ${port}`)); 