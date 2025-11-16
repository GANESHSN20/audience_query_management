const express = require('express');
const cors = require('cors');
const Query = require('./models/Query');

require("dotenv").config({path:"../.env"});
const port = process.env.PORT;

require('./database');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

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

app.listen(port, () => console.log(`Server running on port ${port}`));
