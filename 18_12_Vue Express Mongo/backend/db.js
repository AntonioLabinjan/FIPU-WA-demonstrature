import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config(); // učitavamo .env varijable

const mongoURI = process.env.MONGO_URI;
const db_name = process.env.DB_NAME;

let db;

async function connectToDatabase() {
  if (db) return db; // vraćamo već postojeću instancu ako postoji
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    console.log('Uspješno spajanje na bazu podataka');
    db = client.db(db_name);
    return db;
  } catch (error) {
    console.error('Greška prilikom spajanja na bazu podataka', error);
    throw error;
  }
}

export { connectToDatabase };
