const express = require("express");
const router = express.Router();
const Url = require("../models/urlModel");
const { nanoid } = require("nanoid");

// POST /shorten — Create a new short URL
router.post("/shorten", async (req, res) => {
  const { url } = req.body;

  // ✅ Step 1: Validate input
  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ error: "URL is required and must be a string" });
  }

  try {
    // ✅ Step 2: Generate unique short code
    const shortCode = nanoid(6); // Generates a 6-character random ID

    // ✅ Step 3: Create new URL entry in DB
    const newUrl = await Url.create({ url, shortCode });

    // ✅ Step 4: Send response
    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
