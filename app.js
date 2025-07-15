const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const urlRoutes = require("./routes/urlRoutes");

// Load environment variables
dotenv.config();

// ✅ Initialize Express app
const app = express();

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Register routes
app.use("/", urlRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
