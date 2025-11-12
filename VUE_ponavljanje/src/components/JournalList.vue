<template>
  <div>
    <h2>Notes</h2>
    <p v-if="notes.length === 0">No notes yet.</p>
    <div v-for="note in notes" :key="note.id">
      <JournalItem :note="note" @delete-note="$emit('delete-note', note.id)" @edit-note="$emit('edit-note', $event)" />
    </div>
  </div>
</template>

<script setup>
/*
JournalList.vue

Ova komponenta prikazuje **listu bilješki** koristeći JournalItem komponentu.

Props:
- notes (Array)
  Dolazi iz parenta (JournalPage.vue), sadrži listu bilješki { id, title, content, date }

Emits:
- 'delete-note'
  Emit-a se kada neki JournalItem emit-a 'delete-note'.
  Payload: id bilješke koja se briše
  Parent (JournalPage) hvata i poziva deleteNote(id)

- 'edit-note'
  Emit-a se kada neki JournalItem emit-a 'edit-note'.
  Payload: note objekt za edit
  Parent (JournalPage) hvata i poziva editNote(note)

Event flow:
1. JournalItem emit-a 'delete-note' ili 'edit-note' → JournalList hvata → emit-a dalje prema JournalPage
2. JournalPage obrađuje evente i update-a state (notes, noteToEdit)

Dodatno:
- Ako lista notes-a prazna, prikazuje se poruka "No notes yet."
- Svaka bilješka se renderira preko v-for s key=note.id
*/


import { defineProps } from 'vue'
import JournalItem from './JournalItem.vue'

const props = defineProps({
  notes: {
    type: Array,
    default: () => []
  }
})
</script>
