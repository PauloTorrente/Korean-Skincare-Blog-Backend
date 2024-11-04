require("dotenv").config();
const http = require("http");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

// Log connection details
console.log("Connecting to database at:", process.env.DATABASE_URL);

// Create a sample table if it doesn't exist
const createTable = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      )
    `;
    console.log("Table created or already exists.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

// Insert a sample row
const insertSampleData = async () => {
  try {
    await sql`INSERT INTO test_table (name) VALUES ('Sample Data')`;
    console.log("Sample data inserted.");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

// Retrieve the version of the database
const getVersion = async () => {
  try {
    const result = await sql`SELECT version()`;
    return result[0].version;
  } catch (error) {
    console.error("Error fetching version:", error);
  }
};

// Handle incoming requests
const requestHandler = async (req, res) => {
  await createTable(); // Ensure the table exists
  await insertSampleData(); // Insert sample data
  const version = await getVersion(); // Get database version
  
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`Database version: ${version}`);
};

// Start the server
http.createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
