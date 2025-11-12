<template>
  <div class="note">
    <h3>{{ note.title }}</h3>
    <small>{{ note.date }}</small>
    <p>{{ note.content }}</p>
    <button @click="$emit('delete-note')">Delete</button>
    <button @click="$emit('edit-note', note)">Edit</button>
  </div>
</template>

<script setup>
/*
JournalItem.vue

Ova komponenta predstavlja **jednu bilješku** unutar liste (JournalList).

Props:
- note (Object)
  Dolazi iz parenta (JournalList.vue), sadrži { id, title, content, date }

Emits:
- 'delete-note'
  Emit-a se kada korisnik klikne na Delete button.
  Parent (JournalList) hvata ovaj event i poziva funkciju za brisanje.

- 'edit-note'
  Emit-a se kada korisnik klikne na Edit button.
  Payload: note (Object)
  Parent (JournalList) hvata ovaj event i emit-a dalje prema JournalPage da se popuni JournalForm za edit.

Event flow:
1. JournalItem emit-a 'delete-note' → JournalList hvata → emit-a dalje prema JournalPage → deleteNote()
2. JournalItem emit-a 'edit-note' → JournalList hvata → emit-a dalje prema JournalPage → editNote()

Dodatno:
- UI: prikazuje naslov, datum i sadržaj bilješke
- Stil: jednostavan border, padding, margin
*/


import { defineProps } from 'vue'

const props = defineProps({
  note: Object
})
</script>

<style>
.note {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
