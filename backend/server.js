const express = require('express');
const cors = require('cors');
const path = require("path");
const Query = require('./models/Query');

require("dotenv").config();
const port = process.env.PORT;

require('./database');

const app = express();
app.use(cors());
app.use(express.json());
// Serve frontend files from "frontend" folder
app.use(express.static(path.join(__dirname, "frontend")));

// Create a query
app.post('/queries', async (req, res) => {
    const query = new Query({
        ...req.body,
        history: [{ action: "Created" }]
    });

    await query.save();
    res.json(query);
});

// Get all queries
app.get('/queries', async (req, res) => {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.json(queries);
});

// Update status, category, priority
app.put('/queries/:id', async (req, res) => {
    const { id } = req.params;

    const updated = await Query.findByIdAndUpdate(
        id,
        { 
          ...req.body,
          $push: { history: { action: "Updated" } }
        },
        { new: true }
    );

    res.json(updated);
});

// Fallback for frontend (for all unmatched routes)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
