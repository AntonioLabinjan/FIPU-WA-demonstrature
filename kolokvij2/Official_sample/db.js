// db.js
require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let client;
let db;

/**
 * Poveži se na MongoDB i vrati instancu baze
 */
async function connectDB() {
  if (db) return db; // već spojeno
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log("🟢 MongoDB connected!");
    db = client.db(dbName);
    return db;
  } catch (err) {
    console.error("🔴 MongoDB connection failed:", err);
    throw err;
  }
}

/**
 * Vrati kolekciju prema imenu
 */
function getCollection(name) {
  if (!db) throw new Error("DB not initialized! Call connectDB() first.");
  return db.collection(name);
}

module.exports = { connectDB, getCollection };