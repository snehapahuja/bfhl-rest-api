const express = require("express");
const app = express();

app.use(express.json());

// Root route ("/") to show a welcome message
app.get("/", (req, res) => {
  res.send("Welcome to the BFHL API! Use /bfhl for GET and POST requests.");
});

// GET /bfhl - Returns hardcoded operation code
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST /bfhl - Process input and return expected response
app.post("/bfhl", (req, res) => {
  try {
    if (!req.body || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' must be an array.",
      });
    }

    const data = req.body.data;
    const numbers = [];
    const alphabets = [];
    let highest_alphabet = "";

    for (const item of data) {
      if (/^\d+$/.test(item)) {
        // Check if it's a number
        numbers.push(item);
      } else if (typeof item === "string" && item.length === 1 && isNaN(item)) {
        // Check if it's a single alphabet character
        alphabets.push(item);
        if (
          !highest_alphabet ||
          item.toUpperCase() > highest_alphabet.toUpperCase()
        ) {
          highest_alphabet = item;
        }
      }
    }

    res.status(200).json({
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet ? [highest_alphabet] : [],
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Internal Server Error",
    });
  }
});

// Start server
// Start server
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

