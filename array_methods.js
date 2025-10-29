// ----- ARRAY OBJEKATA -----
const studenti = [
  { ime: "Ana", godina: 21, prosjek: 4.3, online: true },
  { ime: "Marko", godina: 23, prosjek: 3.8, online: false },
  { ime: "Lana", godina: 20, prosjek: 4.9, online: true },
  { ime: "Ivan", godina: 22, prosjek: 2.7, online: false },
  { ime: "Petra", godina: 19, prosjek: 4.0, online: true }
];

// ===== FIND =====
// find() vraća PRVI element koji zadovoljava uvjet
const topStudent = studenti.find(s => s.prosjek > 4.5);
console.log("Prvi student s prosjekom iznad 4.5:", topStudent);

// lošija verzija
let topStudent = null;

for (let i = 0; i < studenti.length; i++) {
  if (studenti[i].prosjek > 4.5) {
    topStudent = studenti[i];
    break; // prekidamo jer želimo samo PRVOG koji zadovoljava uvjet
  }
}

console.log("Prvi student s prosjekom iznad 4.5:", topStudent);

// ===== FINDINDEX =====
// findIndex() vraća INDEX prvog elementa koji zadovoljava uvjet
const indexIvana = studenti.findIndex(s => s.ime === "Ivan");
console.log("Index Ivana:", indexIvana);

// lošija verzija

let indexIvana = -1; // ako ga ne nađemo, ostaje -1 (isti princip kao kod findIndex)

for (let i = 0; i < studenti.length; i++) {
  if (studenti[i].ime === "Ivan") {
    indexIvana = i;
    break; // čim ga nađemo, prekidamo
  }
}

console.log("Index Ivana:", indexIvana);

// ===== MAP =====
// map() stvara NOVI niz tako da transformira svaki element originalnog niza
const imena = studenti.map(s => s.ime);
console.log("Sva imena:", imena);

// lošija verzija
let imena = [];

for (let i = 0; i < studenti.length; i++) {
  imena.push(studenti[i].ime);
}

console.log("Sva imena:", imena);

// ===== FILTER =====
// filter() vraća NIZ svih elemenata koji zadovoljavaju uvjet
const online = studenti.filter(s => s.online);
console.log("Aktivni studenti:", online);

// lošija verzija
let online = [];

for (let i = 0; i < studenti.length; i++) {
  if (studenti[i].online) {
    online.push(studenti[i]);
  }
}

console.log("Aktivni studenti:", online);


// ===== REDUCE =====
// reduce() "sažima" niz u jednu vrijednost (npr. zbroj, prosjek, maksimum...)
const prosjecnaOcjena = studenti.reduce((zbroj, s) => zbroj + s.prosjek, 0) / studenti.length;
console.log("Prosječna ocjena svih:", prosjecnaOcjena.toFixed(2));

// lošija verzija
let zbroj = 0;

for (let i = 0; i < studenti.length; i++) {
  zbroj += studenti[i].prosjek;
}

const prosjecnaOcjena = zbroj / studenti.length;
console.log("Prosječna ocjena svih:", prosjecnaOcjena.toFixed(2));


// ===== SOME =====
// some() vraća true ako BAREM JEDAN element zadovoljava uvjet
const imaPeticu = studenti.some(s => s.prosjek === 5.0);
console.log("Ima li netko čistu peticu:", imaPeticu);

// lošija verzija
let imaPeticu = false;

for (let i = 0; i < studenti.length; i++) {
  if (studenti[i].prosjek === 5.0) {
    imaPeticu = true;
    break;
  }
}

console.log("Ima li netko čistu peticu:", imaPeticu);

// ===== EVERY =====
// every() vraća true samo ako SVI elementi zadovoljavaju uvjet
const sviOnline = studenti.every(s => s.online);
console.log("Jesu li svi aktivni:", sviOnline);

// lošija verzija
let sviOnline = true;

for (let i = 0; i < studenti.length; i++) {
  if (!studenti[i].online) {
    sviOnline = false;
    break;
  }
}

console.log("Jesu li svi aktivni:", sviOnline);

// ===== SLICE =====
// slice() vraća KOPIJU dijela niza (ne mijenja original)
const prviTrojica = studenti.slice(0, 3);
console.log("Prva 3 studenta (slice):", prviTrojica);

// lošija verzija
let prviTrojica = [];

for (let i = 0; i < 3 && i < studenti.length; i++) {
  prviTrojica.push(studenti[i]);
}

console.log("Prva 3 studenta (slice):", prviTrojica);

// ===== SPLICE =====
// splice() MIJENJA originalni niz – može brisati ili dodavati elemente
const kopija = [...studenti]; // da ne diramo original
kopija.splice(1, 1); // izbaci element na indeksu 1
console.log("Nakon splice (izbačen drugi student):", kopija);


// lošija verzija
const kopija = [...studenti]; // da ne diramo original
let noviNiz = [];

for (let i = 0; i < kopija.length; i++) {
  if (i !== 1) { // preskoči element na indeksu 1
    noviNiz.push(kopija[i]);
  }
}

console.log("Nakon for petlje (izbačen drugi student):", noviNiz);

// ===== FOR =====
// klasični for – koristimo indekse za iteraciju
console.log("\n--- FOR ---");
for (let i = 0; i < studenti.length; i++) {
  console.log(i, studenti[i].ime);
}

// ===== FOREACH =====
// forEach() prolazi kroz svaki element bez vraćanja novog niza
console.log("\n--- FOREACH ---");
studenti.forEach(s => console.log(s.ime));

// ===== FOR OF =====
// for...of prolazi kroz VRIJEDNOSTI elemenata niza
console.log("\n--- FOR OF ---");
for (const s of studenti) {
  console.log(s.ime, "-", s.prosjek);
}

// ===== FOR IN =====
// for...in prolazi kroz KLJUČEVE (property nazive) objekta
console.log("\n--- FOR IN ---");
for (const key in studenti[0]) {
  console.log(`Ključ: ${key}, Vrijednost: ${studenti[0][key]}`);
}


// ===== SORT =====

// sort() sortira elemente niza — PO DEFAULTU kao stringove, pa treba definirati komparator za brojeve
console.log("\n--- SORT ---");

// Sortiraj po prosjeku (od najnižeg prema najvišem)
// ...studenti stvara kopiju original arraya
const sortiraniPoProsjeku = [...studenti].sort((a, b) => a.prosjek - b.prosjek);
console.log("Sortirani po prosjeku (uzlazno):", sortiraniPoProsjeku);

// Sortiraj po imenu (abecedno)
const sortiraniPoImenu = [...studenti].sort((a, b) => a.ime.localeCompare(b.ime));
console.log("Sortirani po imenu (abecedno):", sortiraniPoImenu);

// Sortiraj po godini (od najstarijeg prema najmlađem)
const sortiraniPoGodini = [...studenti].sort((a, b) => b.godina - a.godina);
console.log("Sortirani po godini (silazno):", sortiraniPoGodini);
