const express = require('express');
const router = express.Router();

let klinike = [
  {
    id: 1,
    naziv: 'Psihijatrijska klinika Sv. Ivan',
    lokacija: 'Zagreb',
    broj_kreveta: 120,
    broj_psihijatara: 15,
    kontakt_broj: '01 5555 444'
  }
];



// GET sve klinike
router.get('/', (req, res) => {
  res.status(200).json(klinike);
});

// GET po ID
// odmah ćemo dodati provjere
// a) je li id broj
// b) je li tražena klinika stvarno postojeća
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ poruka: 'ID mora biti broj' });

  const klinika = klinike.find(k => k.id === id);
  if (!klinika) return res.status(404).json({ poruka: 'Klinika nije pronađena' });

  res.status(200).json(klinika);
});

// POST 
// provjera dali smo sve prosljedili
// provjera da brojevi ne smiju biti negativni
router.post('/', (req, res) => {
  const { naziv, lokacija, broj_kreveta, broj_psihijatara, kontakt_broj } = req.body;

  if (!naziv || !lokacija || broj_kreveta == null || broj_psihijatara == null || !kontakt_broj) {
    return res.status(400).json({ poruka: 'Nedostaju potrebni podaci' });
  }

  if (broj_kreveta < 0 || broj_psihijatara < 0) {
    return res.status(400).json({ poruka: 'Brojevi ne mogu biti negativni' });
  }

  const novaKlinika = {
    id: klinike.length ? klinike[klinike.length - 1].id + 1 : 1,
    naziv,
    lokacija,
    broj_kreveta,
    broj_psihijatara,
    kontakt_broj
  };

  klinike.push(novaKlinika);
  res.status(201).json({ poruka: 'Klinika dodana', klinika: novaKlinika });
});

// PUT potpuno ažuriranje
// provjera dali je id broj
// provjera dali klinika postoji
// provjera dali smo poslali sve podatke
// provjera dali su svi brojevi nenegativni
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ poruka: 'ID mora biti broj' });

  const index = klinike.findIndex(k => k.id === id);
  if (index === -1) return res.status(404).json({ poruka: 'Klinika nije pronađena' });

  const { naziv, lokacija, broj_kreveta, broj_psihijatara, kontakt_broj } = req.body;

  if (!naziv || !lokacija || broj_kreveta == null || broj_psihijatara == null || !kontakt_broj) {
    return res.status(400).json({ poruka: 'Svi podaci moraju biti poslani' });
  }

  if (broj_kreveta < 0 || broj_psihijatara < 0) {
    return res.status(400).json({ poruka: 'Negativne vrijednosti nisu dozvoljene' });
  }

  klinike[index] = { id, naziv, lokacija, broj_kreveta, broj_psihijatara, kontakt_broj };
  res.status(200).json({ poruka: 'Klinika ažurirana', klinika: klinike[index] });
});

// PATCH djelomično ažuriranje
// provera dozvoljenih ključeva
// provjera  nenegativnosti
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ poruka: 'ID mora biti broj' });

  const klinika = klinike.find(k => k.id === id);
  if (!klinika) return res.status(404).json({ poruka: 'Klinika nije pronađena' });

  const dozvoljenaPolja = ['naziv', 'lokacija', 'broj_kreveta', 'broj_psihijatara', 'kontakt_broj'];
  for (let kljuc in req.body) {
    if (dozvoljenaPolja.includes(kljuc)) klinika[kljuc] = req.body[kljuc];
  }

  if (klinika.broj_kreveta < 0 || klinika.broj_psihijatara < 0) {
    return res.status(400).json({ poruka: 'Negativne vrijednosti nisu dozvoljene' });
  }

  res.status(200).json({ poruka: 'Klinika djelomično ažurirana', klinika });
});

// DELETE
// provjera dali klinika koju želimo obrisati postoji
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ poruka: 'ID mora biti broj' });

  const index = klinike.findIndex(k => k.id === id);
  if (index === -1) return res.status(404).json({ poruka: 'Klinika nije pronađena' });

  klinike.splice(index, 1);
  res.status(200).json({ poruka: 'Klinika obrisana' });
});

module.exports = router;
