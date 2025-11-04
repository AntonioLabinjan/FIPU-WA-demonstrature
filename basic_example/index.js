// kako dobiti sve ovo?
// enter terminal
// cd desktop
// mkdir Demos1
// cd Demos1
// npm init -y
// npm install express express-json nodemon
// pojavit će se paketi u package.json (taj fajl ne dirate osim ako točno znate ča radite i želite nešto specifično obrisat jer vam brejka aplikaciju) i node_modules (vrijedi isto ko za .json)
// code .
// nodemon nam omogućava hot reloads express servera

// dosta s dosadnim stvarima, ajmo na jednostavniji zadatak

// 1) Napišite sve potrebne importove za pokrenuti express server
// 2) Instancirajte aplikaciju
// 3) Definirajte port (preporučljivo 3000, ali morete koji god)
// 4.1) Koji tip podataka se koristi za slanje sadržaja http requestova?
// 4.2) Di se definira sadržaj http requestova?
// 4.3) Omogućite korištenje tog tipa podataka u 1 liniji

// 5) Napišite osnovnu GET rutu na / putanji koja će vraćati proizvoljnu poruku
// 6) Definirajte GET rutu koja će vratiti array korisnika
// 6.1) Some help: svaki korisnik je objekt i sastoji se od id-ja, imena i prezimena

// 7) Definirajte POST rutu za dodavanje novog korisnika
// 7.1) osigurajte da se id automatski generira tako da uvijek bude za 1 veći od zadnjeg
// 7.2) gdje ćete definirati podatke o korisniku kojeg dodajete?

// 8) Nemojte zaboraviti na status kodove :D
// 9) Pobrinite se da ishendlate slučaj u kojem nema korisnika za dohvat

const express = require('express');
const app = express();
const PORT = 3000;

// omogućuje parsiranje JSON body-a u POST zahtjevima
app.use(express.json());

// GET /
app.get('/', (req, res) => {
  res.json({ poruka: 'Delaaaaaaa' });
});

// GET /users
app.get('/users', (req, res) => {
  const users = [
    { id: 1, ime: 'Marko', prezime: 'Marković' },
    { id: 2, ime: 'Ana', prezime: 'Anić' },
    { id: 3, ime: 'Ivan', prezime: 'Ivić' }
  ];
  
  res.status(200).json(users);

  if (users.length === 0) {
  return res.status(404).json({ poruka: 'Nema korisnika!' });
}
});


// POST /users
app.post('/users', (req, res) => {
  const noviUser = req.body;
  noviUser.id = users.length + 1;
  users.push(noviUser);
  res.status(201).json({
    poruka: 'Korisnik uspješno dodan!',
    korisnik: noviUser
  });
});

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
