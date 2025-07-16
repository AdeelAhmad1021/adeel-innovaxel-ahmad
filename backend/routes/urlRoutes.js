const express = require("express");
const router = express.Router();
const Url = require("../models/urlModel");
const { nanoid } = require("nanoid");

// 📌 POST /shorten — Create a new short URL
router.post("/shorten", async (req, res) => {
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ error: "URL is required and must be a string" });
  }

  try {
    const shortCode = nanoid(6); // Generate 6-character short code

    const newUrl = await Url.create({ url, shortCode });

    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 📌 GET /shorten/:shortCode — Retrieve original URL
router.get("/shorten/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  if (!shortCode) {
    return res.status(400).json({ error: "Short code is required in the URL" });
  }

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    urlDoc.accessCount += 1;
    await urlDoc.save();

    res.status(200).json(urlDoc);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 📌 PUT /shorten/:shortCode — Update original URL
router.put("/shorten/:shortCode", async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  if (!shortCode) {
    return res.status(400).json({ error: "Short code is required in the URL" });
  }

  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ error: "URL is required and must be a string" });
  }

  try {
    const updated = await Url.findOneAndUpdate(
      { shortCode },
      { url },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 📌 DELETE /shorten/:shortCode — Remove a short URL
router.delete("/shorten/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  if (!shortCode) {
    return res.status(400).json({ error: "Short code is required in the URL" });
  }

  try {
    const deleted = await Url.findOneAndDelete({ shortCode });

    if (!deleted) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 📌 GET /shorten/:shortCode/stats — Get access statistics
router.get("/shorten/:shortCode/stats", async (req, res) => {
  const { shortCode } = req.params;

  if (!shortCode) {
    return res.status(400).json({ error: "Short code is required in the URL" });
  }

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.status(200).json({
      id: urlDoc._id,
      url: urlDoc.url,
      shortCode: urlDoc.shortCode,
      createdAt: urlDoc.createdAt,
      updatedAt: urlDoc.updatedAt,
      accessCount: urlDoc.accessCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Url = require("../models/urlModel");
// const { nanoid } = require("nanoid");

// // POST /shorten — Create a new short URL
// router.post("/shorten", async (req, res) => {
//   const { url } = req.body;

//   // ✅ Step 1: Validate input
//   if (!url || typeof url !== "string") {
//     return res
//       .status(400)
//       .json({ error: "URL is required and must be a string" });
//   }

//   try {
//     // ✅ Step 2: Generate unique short code
//     const shortCode = nanoid(6); // Generates a 6-character random ID
//     if (!shortCode) {
//       return res
//         .status(400)
//         .json({ error: "Short code is required in the URL" });
//     }

//     // ✅ Step 3: Create new URL entry in DB
//     const newUrl = await Url.create({ url, shortCode });

//     // ✅ Step 4: Send response
//     res.status(201).json(newUrl);
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// module.exports = router;

// // GET /shorten/:shortCode — Retrieve original URL
// router.get("/shorten/:shortCode", async (req, res) => {
//   const { shortCode } = req.params;

//   try {
//     // Find the document with this shortCode
//     const urlDoc = await Url.findOne({ shortCode });

//     // Increment accessCount
//     urlDoc.accessCount += 1;
//     await urlDoc.save();

//     // Return the full object
//     res.status(200).json(urlDoc);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // PUT /shorten/:shortCode — Update original URL
// router.put("/shorten/:shortCode", async (req, res) => {
//   const { shortCode } = req.params;
//   const { url } = req.body;

//   // ✅ Basic validation
//   if (!url || typeof url !== "string") {
//     return res
//       .status(400)
//       .json({ error: "URL is required and must be a string" });
//   }

//   try {
//     // Find and update the URL
//     const updated = await Url.findOneAndUpdate(
//       { shortCode },
//       { url },
//       { new: true, runValidators: true } // return updated doc
//     );

//     // If not found
//     if (!updated) {
//       return res.status(404).json({ error: "Short URL not found" });
//     }

//     res.status(200).json(updated);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // DELETE /shorten/:shortCode — Remove a short URL
// router.delete("/shorten/:shortCode", async (req, res) => {
//   const { shortCode } = req.params;

//   try {
//     const deleted = await Url.findOneAndDelete({ shortCode });

//     if (!deleted) {
//       return res.status(404).json({ error: "Short URL not found" });
//     }

//     // Successfully deleted
//     res.status(204).send(); // No content
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // GET /shorten/:shortCode/stats — Get access statistics for short url
// router.get("/shorten/:shortCode/stats", async (req, res) => {
//   const { shortCode } = req.params;

//   try {
//     const urlDoc = await Url.findOne({ shortCode });

//     if (!urlDoc) {
//       return res.status(404).json({ error: "Short URL not found" });
//     }

//     // Send only stats
//     res.status(200).json({
//       id: urlDoc._id,
//       url: urlDoc.url,
//       shortCode: urlDoc.shortCode,
//       createdAt: urlDoc.createdAt,
//       updatedAt: urlDoc.updatedAt,
//       accessCount: urlDoc.accessCount,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });
