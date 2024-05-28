const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;
const openaiRoutes = require("./routes/openaiRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false}));

// Routes
app.get("/", (req, res) => {
  res.send("hello Backend");
});
app.use("/api", openaiRoutes);


// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
  