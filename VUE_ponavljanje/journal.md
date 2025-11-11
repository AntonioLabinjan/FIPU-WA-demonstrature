# Vue.js Mini Projekt: Journal App

## Cilj
Napraviti malu **Vue.js aplikaciju** koja služi kao osobni dnevnik (journal) gdje korisnici mogu:

- unositi bilješke po datumima  
- pregledavati svoje bilješke  
- uređivati i brisati bilješke (**CRUD operacije**)  

Ovim projektom ponovit ćemo osnove Vue.js-a, rad s komponentama, **v-model**, **props**, **evente**, **vue-router**, te osnovnu logiku za rad s listama i formulare.

---

## Funkcionalnosti

1. **Prikaz bilješki**
   - Prikaz svih bilješki u listi, sortirano po datumu (najnovije gore).
   - Svaka bilješka prikazuje datum i naslov.

2. **Dodavanje bilješki**
   - Forma za unos nove bilješke s poljima:
     - Datum (default današnji)
     - Naslov
     - Tekst bilješke
   - Nakon dodavanja, bilješka se pojavljuje u listi.

3. **Uređivanje bilješki**
   - Mogućnost uređivanja postojećih bilješki.
   - Promjene se reflektiraju odmah u prikazu.

4. **Brisanje bilješki**
   - Dugme za brisanje bilješke.
   - Nakon brisanja bilješka nestaje iz liste.

5. **Brojanje bilješki**
   - Automatski izračun trenutnog broja bilješki (onMounted + computed)

6. **Simple routing**
   - Dodajte **About page** kroz `vue-router` s nekim osnovnim informacijama o aplikaciji.
   - Navigacija između glavne journal liste i About page-a.

---

## Struktura aplikacije (preporučena)

- `App.vue` – glavni container, poziva glavne komponente i sadrži `<router-view>`
- `JournalList.vue` – komponenta za prikaz liste bilješki
- `JournalItem.vue` – komponenta za jednu bilješku (datum, naslov, tekst, edit/delete)
- `JournalForm.vue` – komponenta za dodavanje ili uređivanje bilješke
- `About.vue` – statična stranica s informacijama o aplikaciji
- `router/index.js` – konfiguracija ruta

---

## Bonus zadaci

- **Filtriranje po datumu** – omogućiti korisniku da vidi samo bilješke iz određenog datuma.
- **LocalStorage** – pohraniti bilješke u browser tako da se ne izgube nakon refresh-a.
- **Mini UI makeover** – stilizirati aplikaciju koristeći CSS ili Tailwind.
- **Pop-upovi** – nakon uspješnog dodavanja bilješke, potvrda brisanja i slično.

---

## Tehnički savjeti

- Koristite **v-model** za bindanje formi.
- Emitajte evente iz child komponenti prema `App.vue` za dodavanje, uređivanje i brisanje.
- Koristite **props** za prijenos podataka iz parent u child.
- Držite state (listu bilješki) u `App.vue` i šaljite ga dalje preko props.
- Za routing koristite **vue-router**, `<router-link>` za navigaciju i `<router-view>` za prikaz komponenti.
