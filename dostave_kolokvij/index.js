const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

// Endpoint /info
app.get('/info', (req, res) => {
  res.json({
    ime: "Vaše ime",
    prezime: "Vaše prezime",
    jmbag: "Vaš JMBAG"
  });
});


const artikliRouter = require('./routes/artikli');
app.use('/artikli', artikliRouter);


const dostaveRouter = require('./routes/dostave');
app.use('/dostave', dostaveRouter);


// Pokretanje poslužitelja
app.listen(PORT, () => {
  console.log(`Skladište server pokrenut na portu ${PORT}`);
});
