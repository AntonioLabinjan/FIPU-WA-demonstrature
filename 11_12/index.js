const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'zaposlenici.json');


async function readEmployees() {
  try {
    const txt = await fs.readFile(DATA_FILE, 'utf8');
    const arr = JSON.parse(txt);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch (err) {
    return [];
  }
};

async function writeEmployees(arr) {
  await fs.writeFile(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');
};

function validateEmployeeBody(body) {
  const errors = [];

  if (body === null || typeof body !== 'object') {
    errors.push('Tijelo zahtjeva mora biti JSON objekt.');
    return errors;
  }

  const { ime, prezime, godine_staža, pozicija } = body;

  if (ime === undefined) errors.push('Nedostaje polje: ime.');
  else if (typeof ime !== 'string' || ime.trim() === '')
    errors.push('Polje ime mora biti nenulti string.');

  if (prezime === undefined) errors.push('Nedostaje polje: prezime.');
  else if (typeof prezime !== 'string' || prezime.trim() === '')
    errors.push('Polje prezime mora biti nenulti string.');

  if (godine_staža === undefined)
    errors.push('Nedostaje polje: godine_staža.');
  else if (
    typeof godine_staža !== 'number' ||
    !Number.isFinite(godine_staža) ||
    !Number.isInteger(godine_staža) ||
    godine_staža < 0
  )
    errors.push('Polje godine_staža mora biti nenegativan cijeli broj.');

  if (pozicija === undefined)
    errors.push('Nedostaje polje: pozicija.');
  else if (typeof pozicija !== 'string' || pozicija.trim() === '')
    errors.push('Polje pozicija mora biti nenulti string.');

  return errors;
};


app.get('/', (req, res) => {
  res.send('SERVER RADI');
});


/**
 * GET /zaposlenici
 * Query params:
 *  - sortiraj_po_godinama=asc|desc
 *  - pozicija=string
 *  - godine_staža_min=number
 *  - godine_staža_max=number
 */
app.get('/zaposlenici', async (req, res) => {
  try {
    let employees = await readEmployees();

    if (req.query.pozicija) {
      const q = req.query.pozicija.toLowerCase();
      employees = employees.filter(
        e => typeof e.pozicija === 'string' && e.pozicija.toLowerCase() === q
      );
    }

    if (req.query.godine_staža_min !== undefined) {
      const min = parseInt(req.query.godine_staža_min, 10);
      if (Number.isNaN(min))
        return res.status(400).json({ error: 'Query param godine_staža_min mora biti broj.' });
      employees = employees.filter(e => e.godine_staža >= min);
    }

    if (req.query.godine_staža_max !== undefined) {
      const max = parseInt(req.query.godine_staža_max, 10);
      if (Number.isNaN(max))
        return res.status(400).json({ error: 'Query param godine_staža_max mora biti broj.' });
      employees = employees.filter(e => e.godine_staža <= max);
    }

    if (req.query.sortiraj_po_godinama) {
      const dir = req.query.sortiraj_po_godinama.toLowerCase();
      if (dir !== 'asc' && dir !== 'desc') {
        return res.status(400).json({ error: 'Mora biti asc ili desc.' });
      }
      employees.sort((a, b) => a.godine_staža - b.godine_staža);
      if (dir === 'desc') employees.reverse();
    }

    if (employees.length === 0) {
      return res.status(404).json({ message: 'Nema zaposlenika.' });
    }

    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Greška servera.' });
  }
});


/**
 * GET /zaposlenici/:id
 */
app.get('/zaposlenici/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id))
    return res.status(400).json({ error: 'ID mora biti broj.' });

  const employees = await readEmployees();
  const emp = employees.find(e => e.id === id);

  if (!emp)
    return res.status(404).json({ error: 'Zaposlenik nije pronađen.' });

  res.json(emp);
});


/**
 * POST /zaposlenici
 */
app.post('/zaposlenici', async (req, res) => {
  const errors = validateEmployeeBody(req.body);
  if (errors.length > 0)
    return res.status(400).json({ errors });

  const employees = await readEmployees();
  const newId =
    employees.length > 0
      ? Math.max(...employees.map(e => e.id)) + 1
      : 1;

  const newEmployee = {
    id: newId,
    ime: req.body.ime,
    prezime: req.body.prezime,
    godine_staža: req.body.godine_staža,
    pozicija: req.body.pozicija
  };

  employees.push(newEmployee);
  await writeEmployees(employees);

  res.status(201).json(newEmployee);
});


app.use((req, res) => {
  res.status(404).json({ error: 'Ruta nije pronađena.' });
});


const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server pokrenut na http://localhost:${PORT}`);
});
