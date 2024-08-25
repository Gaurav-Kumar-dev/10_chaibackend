import dotenv from "dotenv";
import connectDB from "./db/index.js";  // Import database connection function
import app from "./app.js";             // Import Express app

// Load environment variables from the .env file
dotenv.config({ path: "./.env" });

// Connect to the database first
connectDB()
  .then(() => {
    // Start the server only after the database connection is successful
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    // Log any errors that occur during database connection
    console.error("Error connecting to the database", error);
  });
