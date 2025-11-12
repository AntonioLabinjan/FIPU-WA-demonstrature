<template>
  <form @submit.prevent="submitNote">
    <input v-model="title" placeholder="Title" required />
    <textarea v-model="content" placeholder="Content" required></textarea>
    <input type="date" v-model="date" />
    <button type="submit">Add Note</button>
  </form>
</template>

<script setup>

/*
JournalForm.vue

Props:
- noteToEdit (Object)
  Dolazi iz parent komponente. Ako postoji, forma popunjava polja za edit. 
  Ako je null, forma je prazna i služi za dodavanje nove bilješke.

Emits:
- 'add-note'
  Emit-a se kada korisnik submit-a formu za novu bilješku.
  Payload: { id, title, content, date }

- 'update-note'
  Emit-a se kada korisnik submit-a formu dok editira postojeću bilješku.
  Payload: { ...originalNote, title, content, date }

Event flow:
- Parent (JournalPage.vue) hvata ove evente:
    <JournalForm 
      @add-note="addNote" 
      @update-note="updateNote" 
      :noteToEdit="noteToEdit" 
    />
- addNote() → dodaje bilješku u notes array
- updateNote() → zamjenjuje bilješku u notes array

Dodatno:
- watch na noteToEdit → automatski popunjava formu kad se edit pokrene
- reset forme nakon submit-a → prazna ili default date
*/


import { ref, watch } from 'vue'

const emit = defineEmits(['add-note', 'update-note'])
const props = defineProps({
  noteToEdit: Object
})

const title = ref('')
const content = ref('')
const date = ref(new Date().toISOString().substr(0,10))

// Kad se noteToEdit promijeni, popuni formu
watch(() => props.noteToEdit, (newNote) => {
  if (newNote) {
    title.value = newNote.title
    content.value = newNote.content
    date.value = newNote.date
  } else {
    title.value = ''
    content.value = ''
    date.value = new Date().toISOString().substr(0,10)
  }
})

const submitNote = () => {
  if (props.noteToEdit) {
    emit('update-note', { ...props.noteToEdit, title: title.value, content: content.value, date: date.value })
  } else {
    emit('add-note', { id: Date.now(), title: title.value, content: content.value, date: date.value })
  }
  title.value = ''
  content.value = ''
  date.value = new Date().toISOString().substr(0,10)
}
</script>
