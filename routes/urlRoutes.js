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

// GET /shorten/:shortCode — Retrieve original URL
router.get("/shorten/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  try {
    // Find the document with this shortCode
    const urlDoc = await Url.findOne({ shortCode });

    // If not found, return 404
    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Increment accessCount
    urlDoc.accessCount += 1;
    await urlDoc.save();

    // Return the full object
    res.status(200).json(urlDoc);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /shorten/:shortCode — Update original URL
router.put("/shorten/:shortCode", async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  // ✅ Basic validation
  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ error: "URL is required and must be a string" });
  }

  try {
    // Find and update the URL
    const updated = await Url.findOneAndUpdate(
      { shortCode },
      { url },
      { new: true, runValidators: true } // return updated doc
    );

    // If not found
    if (!updated) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /shorten/:shortCode — Remove a short URL
router.delete("/shorten/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  try {
    const deleted = await Url.findOneAndDelete({ shortCode });

    if (!deleted) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Successfully deleted
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
