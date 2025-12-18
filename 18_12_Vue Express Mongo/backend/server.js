import express from 'express';
import { FindCursor } from 'mongodb';
import { connectToDatabase } from './db.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());


const db = await connectToDatabase();

await db.collection('kolegiji').createIndex({ naziv: 1 });
console.log('Index kreiran na polju naziv');


// Početna ruta
app.get('/', (req, res) => {
    res.send('Kolegiji i profesori app');
});

/* ------------------- KOLEGIJI ------------------- */

app.get('/kolegiji', async (req, res) => {
    try {
        const kolegiji_collection = db.collection('kolegiji');

        const { naziv, ects_min, ects_max, sort } = req.query;
        let filter = {};

        // Pretraga po nazivu (partial match)
        if (naziv) {
            filter.naziv = { $regex: naziv, $options: 'i' };
        }

        // Filter po ECTS
        if (ects_min || ects_max) {
            filter.ects = {};
            if (ects_min) filter.ects.$gte = Number(ects_min);
            if (ects_max) filter.ects.$lte = Number(ects_max);
        }

        let cursor = kolegiji_collection.find(filter);

        // Sortiranje
        if (sort) {
            const [field, direction] = sort.split(':');
            if (['naziv', 'ects'].includes(field)) {
                cursor = cursor.sort({
                    [field]: direction === 'desc' ? -1 : 1
                });
            }
        }

        const kolegiji = await cursor.toArray();
        res.status(200).json(kolegiji);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// POST /kolegiji - dodavanje novog kolegija
app.post('/kolegiji', async (req, res) => {
    const { naziv, sifra, profesor, ects } = req.body;

    if (!naziv || !sifra || !profesor || ects === undefined) {
        return res.status(400).json({ error: "Svi ključevi (naziv, sifra, profesor, ects) moraju biti prisutni" });
    }

    if (typeof ects !== 'number' || typeof profesor !== 'string') {
        return res.status(400).json({ error: "ECTS mora biti broj, profesor string" });
    }

    try {
        const kolegiji_collection = db.collection('kolegiji');
        const result = await kolegiji_collection.insertOne({ naziv, sifra, profesor, ects });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* ------------------- PROFESORI ------------------- */

// POST /profesor - dodavanje novog profesora
app.post('/profesor', async (req, res) => {
    const { ime, prezime, email, predmeti } = req.body;

    // Validacija
    if (!ime || !prezime || !email || !predmeti) {
        return res.status(400).json({ error: "Svi ključevi (ime, prezime, email, predmeti) moraju biti prisutni" });
    }

    if (!Array.isArray(predmeti)) {
        return res.status(400).json({ error: "Predmeti mora biti lista stringova" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: "Email nije validan" });
    }

    try {
        const kolegiji_collection = db.collection('kolegiji');

        

        const profesori_collection = db.collection('profesori');
        const result = await profesori_collection.insertOne({ ime, prezime, email, predmeti });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* ------------------- GET PROFESORI ------------------- */

// GET /profesori - svi profesori s opcionalnim filterom/pretragom
app.get('/profesori', async (req, res) => {
    try {
        const profesori_collection = db.collection('profesori');

        const { ime, prezime, email, predmet } = req.query; // query parametri
        let filter = {};

        if (ime) filter.ime = { $regex: ime, $options: 'i' };
        if (prezime) filter.prezime = { $regex: prezime, $options: 'i' };
        if (email) filter.email = { $regex: email, $options: 'i' };
        if (predmet) filter.predmeti = predmet; // traži profesore koji predaju određeni predmet

        const cursor = profesori_collection.find(filter);
        const profesori = await cursor.toArray();
        res.status(200).json(profesori);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/* ------------------- PORT ------------------- */
const PORT = 3000;
app.listen(PORT, error => {
    if (error) {
        console.log('Greška prilikom pokretanja servera', error);
    } else {
        console.log(`Server radi na http://localhost:${PORT}`);
    }
});
