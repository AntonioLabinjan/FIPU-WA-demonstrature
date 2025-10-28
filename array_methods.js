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

// ===== FINDINDEX =====
// findIndex() vraća INDEX prvog elementa koji zadovoljava uvjet
const indexIvana = studenti.findIndex(s => s.ime === "Ivan");
console.log("Index Ivana:", indexIvana);

// ===== MAP =====
// map() stvara NOVI niz tako da transformira svaki element originalnog niza
const imena = studenti.map(s => s.ime);
console.log("Sva imena:", imena);

// ===== FILTER =====
// filter() vraća NIZ svih elemenata koji zadovoljavaju uvjet
const online = studenti.filter(s => s.online);
console.log("Aktivni studenti:", online);

// ===== REDUCE =====
// reduce() "sažima" niz u jednu vrijednost (npr. zbroj, prosjek, maksimum...)
const prosjecnaOcjena = studenti.reduce((zbroj, s) => zbroj + s.prosjek, 0) / studenti.length;
console.log("Prosječna ocjena svih:", prosjecnaOcjena.toFixed(2));

// ===== SOME =====
// some() vraća true ako BAREM JEDAN element zadovoljava uvjet
const imaPeticu = studenti.some(s => s.prosjek === 5.0);
console.log("Ima li netko čistu peticu:", imaPeticu);

// ===== EVERY =====
// every() vraća true samo ako SVI elementi zadovoljavaju uvjet
const sviOnline = studenti.every(s => s.online);
console.log("Jesu li svi aktivni:", sviOnline);

// ===== SLICE =====
// slice() vraća KOPIJU dijela niza (ne mijenja original)
const prviTrojica = studenti.slice(0, 3);
console.log("Prva 3 studenta (slice):", prviTrojica);

// ===== SPLICE =====
// splice() MIJENJA originalni niz – može brisati ili dodavati elemente
const kopija = [...studenti]; // da ne diramo original
kopija.splice(1, 1); // izbaci element na indeksu 1
console.log("Nakon splice (izbačen drugi student):", kopija);

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
