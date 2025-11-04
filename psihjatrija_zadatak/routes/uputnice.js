const express = require('express');
const router = express.Router();


let uputnice = [];

// GET sve uputnice
/*
router.get('/', (req, res) => {
  res.status(200).json(uputnice);
});
*/

// idemo dodati i filter po hitnosti za dohvat uputnica
// GET sve uputnice, s opcionalnim filterom po hitnosti
// npr. /uputnice?hitno=true
// GET sve uputnice, opcionalno filter po hitnosti i sortiranje po datumu
// npr. /uputnice?hitno=true&sort=desc
router.get('/', (req, res) => {
  const { hitno, sort } = req.query;

  // 1️⃣ Filtriranje po hitnosti ako je proslijeđeno
  let rezultat = uputnice;
  if (hitno !== undefined) {
    const hitnoBool = hitno === 'true';
    rezultat = rezultat.filter(u => u.hitno === hitnoBool);
  }

  // 2️⃣ Sortiranje po datumu ako je proslijeđeno
  if (sort === 'asc' || sort === 'desc') {
    rezultat.sort((a, b) => {
      const dateA = new Date(a.datum);
      const dateB = new Date(b.datum);
      return sort === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  res.status(200).json(rezultat);
});



// GET po ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ poruka: 'ID mora biti broj' });

  const uputnica = uputnice.find(u => u.id === id);
  if (!uputnica) return res.status(404).json({ poruka: 'Uputnica nije pronađena' });

  res.status(200).json(uputnica);
});

// POST nova uputnica
router.post('/', (req, res) => {
  const { ime_pacijenta, prezime_pacijenta, dijagnoza, datum, hitno } = req.body;

  if (!ime_pacijenta || !prezime_pacijenta || !dijagnoza || !datum || hitno == null) {
    return res.status(400).json({ poruka: 'Nedostaju podaci' });
  }
  

  if (typeof hitno !== 'boolean') {
    return res.status(400).json({ poruka: 'Polje hitno mora biti boolean' });
  }
  

  const novaUputnica = {
    // ne šaljemo id u request bodyju, sam se generira
    id: uputnice.length ? uputnice[uputnice.length - 1].id + 1 : 1,
    ime_pacijenta,
    prezime_pacijenta,
    dijagnoza,
    datum,
    hitno
  };

  uputnice.push(novaUputnica);
  res.status(201).json({ poruka: 'Uputnica dodana', uputnica: novaUputnica });
});

// DELETE uputnica
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ poruka: 'ID mora biti broj' });

  const index = uputnice.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ poruka: 'Uputnica nije pronađena' });

  uputnice.splice(index, 1);
  res.status(200).json({ poruka: 'Uputnica obrisana' });
});

module.exports = router;
