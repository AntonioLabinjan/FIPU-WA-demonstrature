// Za početak, idemo prvo definirati routere, da ne roštamo opet po istom kodu
const express = require('express');
const app = express();
const klinikeRouter = require('./routes/klinike');
const uputniceRouter = require('./routes/uputnice');

const PORT = 3000;

app.use(express.json());

// registracija ruta
app.use('/klinike', klinikeRouter);
app.use('/uputnice', uputniceRouter);

app.get('/hello', (req, res) => {
  res.send("Dobrodošli u psihijatriju");
});


app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
