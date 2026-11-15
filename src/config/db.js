import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export const connectDB = async () => {
  try {
    // Connect the client to the server
    await client.connect();
    // Specify the database name here
    db = client.db("edupulse");
    console.log("🟢 Successfully connected to MongoDB Atlas (Native Driver)");
    return db;
  } catch (error) {
    console.error("🔴 MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Export a function to get the database instance anywhere in your app
export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};
