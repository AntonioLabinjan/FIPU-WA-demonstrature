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

---
## Preporučeni redoslijed da se ne pogubimo totalno
1. Napraviti osnovni skeleton Vue projekta s `App.vue` i inicijalnim komponentama.  
2. Dodati **JournalList** i prikaz prazne liste bilješki.  
3. Napraviti **JournalForm** i omogućiti dodavanje novih bilješki u listu (state u `App.vue`).  
4. Implementirati **brisanje bilješki** kroz dugme u **JournalItem** komponenti.  
5. Dodati **uređivanje bilješki** i bindanje forme preko `v-model`.  
6. Implementirati **brojanje bilješki** s computed property u `App.vue`.  
7. Dodati **vue-router** i About page, te navigaciju između stranica.  
8. (Bonus) Dodati filtriranje po datumu, LocalStorage, UI makeover i pop-upove.



# Vue.js Osnove za Journal App

Ova kratka skripta pokriva sve ključne koncepte Vue.js potrebne za izradu Journal App.

---

## 1. Komponente

- Vue aplikacija se sastoji od **komponenti**.
- Svaka komponenta može imati:
  - **template** → HTML
  - **script** → logika, state, metode
  - **style** → lokalni CSS

```vue
<template>
  <h1>{{ title }}</h1>
</template>

<script setup>
import { ref } from 'vue'
const title = ref('Hello Vue!')
</script>

<style>
h1 { color: blue; }
</style>
````

---

## 2. Props

* **Props** služe za slanje podataka iz parent u child komponentu.

```vue
<script setup>
const props = defineProps({
  note: Object
})
</script>

<template>
  <p>{{ props.note.title }}</p>
</template>
```

---

## 3. Emit (eventi)

* **Emit** služi da child komponenta pošalje događaj parentu.
* Parent može "uhvatiti" event i pozvati funkciju.

```vue
<script setup>
const emit = defineEmits(['delete-note'])
const handleDelete = () => emit('delete-note', note.id)
</script>

<template>
  <button @click="handleDelete">Delete</button>
</template>
```

* Parent:

```vue
<JournalItem @delete-note="deleteNote" />
```

---

## 4. Reactive state

* Koristimo `ref()` za primitive i `reactive()` za objekte.
* Vue automatski prati promjene i re-rendera template.

```js
import { ref } from 'vue'
const notes = ref([])
notes.value.push({ id: 1, title: 'Nova bilješka' })
```

---

## 5. Computed properties

* Za izračunavanje vrijednosti koje ovise o state-u.

```js
import { computed } from 'vue'
const noteCount = computed(() => notes.value.length)
```

---

## 6. Watch

* Za "gledanje" promjena state-a i reagiranje na njih.

```js
import { watch } from 'vue'
watch(notes, (newNotes) => {
  localStorage.setItem('notes', JSON.stringify(newNotes))
}, { deep: true })
```

---

## 7. v-model

* Koristi se za dvosmjerno bindanje input polja i state-a.

```vue
<input v-model="title" placeholder="Title" />
```

* Automatski update-a `title` kada korisnik piše i obrnuto.

---

## 8. v-for i key

* Za iteraciju po listama.

```vue
<div v-for="note in notes" :key="note.id">
  <JournalItem :note="note" />
</div>
```

* **key** pomaže Vue-u da efikasno prati elemente.

---

## 9. Router

* Za višestruke stranice (npr. Journal / About).

```js
import { createRouter, createWebHistory } from 'vue-router'
import JournalPage from './views/JournalPage.vue'
import AboutPage from './views/AboutPage.vue'

const routes = [
  { path: '/', component: JournalPage },
  { path: '/about', component: AboutPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
```

* U App.vue:

```vue
<nav>
  <router-link to="/">Journal</router-link>
  <router-link to="/about">About</router-link>
</nav>
<router-view />
```

---

## 10. LocalStorage

* Za pohranu podataka u browser.

```js
if (localStorage.getItem('notes')) {
  notes.value = JSON.parse(localStorage.getItem('notes'))
}

watch(notes, (newNotes) => {
  localStorage.setItem('notes', JSON.stringify(newNotes))
}, { deep: true })
```

---

## 11. Event Flow za Journal App

* **JournalPage.vue** drži state `notes` i `noteToEdit`.
* **JournalForm.vue**

  * Props: `noteToEdit`
  * Emit: `'add-note'`, `'update-note'`
* **JournalList.vue**

  * Props: `notes`
  * Emit: `'delete-note'`, `'edit-note'` (propagira od JournalItem)
* **JournalItem.vue**

  * Props: `note`
  * Emit: `'delete-note'`, `'edit-note'`

---

## 12. Tips & Tricks

* Resetiraj forme nakon submit-a.
* Koristi `computed` za filtriranje liste (po datumu).
* Triggeraj pop-upove ili obavijesti putem reactive state-a.
* Drži state u **parentu**, a child komponentama šalji samo props i evente.

```

