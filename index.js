require("dotenv").config(); 
const express = require("express"); 
const { neon } = require("@neondatabase/serverless"); 
const router = require("./api/router");

const sql = neon(process.env.DATABASE_URL); 

// Create an instance of Express
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use the main router with the /api prefix
app.use("/api", router); 

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); 
});

// Start the server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
