/*
const express = require('express');
const router = express.Router();

// In-memory artikli
let artikli = [
  { id: 1, naziv: "Monitor", kolicina: 10, lokacija: "A1" },
  { id: 2, naziv: "Tipkovnica", kolicina: 25, lokacija: "A2" },
  { id: 3, naziv: "Miš", kolicina: 40, lokacija: "A3" },
  { id: 4, naziv: "Laptop", kolicina: 5, lokacija: "B1" },
  { id: 5, naziv: "Printer", kolicina: 7, lokacija: "B2" }
];

// GET /artikli → svi artikli
router.get('/', (req, res) => {
  res.json(artikli);
});


// ---------------------------------------------------------
// GET /artikli — svi artikli + opcionalni filter po lokaciji
// ---------------------------------------------------------
router.get('/', (req, res) => {
  const { lokacija } = req.query;

  if (lokacija !== undefined) {
    // Validacija
    if (typeof lokacija !== "string" || lokacija.trim() === "") {
      return res.status(400).json({ error: "Neispravna lokacija" });
    }

    const filtrirani = artikli.filter(a => a.lokacija === lokacija);

    return res.json(filtrirani);
  }

  res.json(artikli);
});


// GET /artikli/:id → artikl po ID-u
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const artikl = artikli.find(a => a.id === id);

  if (!artikl) {
    return res.status(404).json({ error: "Artikl nije pronađen" });
  }

  res.json(artikl);
});

// POST /artikli → dodavanje artikla
router.post('/', (req, res) => {
  const { naziv, kolicina, lokacija } = req.body;

  // Validacija
  if (!naziv || !kolicina || !lokacija) {
    return res.status(400).json({ error: "Neispravni podaci" });
  }

  const noviId = artikli.length > 0 ? artikli[artikli.length - 1].id + 1 : 1;

  const noviArtikl = {
    id: noviId,
    naziv,
    kolicina,
    lokacija
  };

  artikli.push(noviArtikl);

  res.status(201).json(noviArtikl);
});

router.post('/', (req, res) => {
  const { naziv, kolicina, lokacija } = req.body;

  // Validacija
  if (!naziv || !kolicina || !lokacija) {
    return res.status(400).json({ error: "Neispravni podaci" });
  }

  const noviId = artikli.length > 0 ? artikli[artikli.length - 1].id + 1 : 1;

  const noviArtikl = {
    id: noviId,
    naziv,
    kolicina,
    lokacija,
    dodano_at: new Date().toISOString()
  };

  artikli.push(noviArtikl);

  res.status(201).json(noviArtikl);
});

module.exports = router;
*/
const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/artikli.json');

// Helper: čitanje JSON datoteke
async function readArtikli() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error('Greška pri čitanju datoteke.');
  }
}

// Helper: zapis JSON datoteke
async function writeArtikli(artikli) {
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(artikli, null, 2));
  } catch (err) {
    throw new Error('Greška pri spremanju datoteke.');
  }
}

// ---------------------------------------------------------
// GET /artikli  (s filterom lokacija)
// ---------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const artikli = await readArtikli();

    const { lokacija } = req.query;

    if (lokacija !== undefined) {
      if (typeof lokacija !== "string" || lokacija.trim() === "") {
        return res.status(400).json({ error: "Neispravna lokacija" });
      }

      const filtrirani = artikli.filter(a => a.lokacija === lokacija);
      return res.json(filtrirani);
    }

    res.json(artikli);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------
// GET /artikli/:id
// ---------------------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const artikli = await readArtikli();

    const id = parseInt(req.params.id);
    const artikl = artikli.find(a => a.id === id);

    if (!artikl) {
      return res.status(404).json({ error: "Artikl nije pronađen" });
    }

    res.json(artikl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------
// POST /artikli  (dodavanje uz pisanje u JSON)
// ---------------------------------------------------------
router.post('/', async (req, res) => {
  try {
    const { naziv, kolicina, lokacija } = req.body;

    if (!naziv || !kolicina || !lokacija) {
      return res.status(400).json({ error: "Neispravni podaci" });
    }

    const artikli = await readArtikli();

    const noviId = artikli.length > 0 ? artikli[artikli.length - 1].id + 1 : 1;

    const noviArtikl = {
      id: noviId,
      naziv,
      kolicina,
      lokacija,
      dodano_at: new Date().toISOString()
    };

    artikli.push(noviArtikl);

    await writeArtikli(artikli);

    res.status(201).json(noviArtikl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
