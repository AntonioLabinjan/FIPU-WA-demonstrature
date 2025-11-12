<template>
  <div>
    <h1>My Journal App</h1>

    <!-- Filter po datumu -->
    <label>Filter by date: </label>
    <input type="date" v-model="filterDate" />
    <div v-if="showPopup" class="popup">{{ popupMessage }}</div>
    <p>Total Notes: {{ filteredNotes.length }}</p>
    <JournalForm @add-note="addNote" @update-note="updateNote" :noteToEdit="noteToEdit" />
    <JournalList 
      :notes="filteredNotes" 
      @delete-note="deleteNote" 
      @edit-note="editNote" 
    />
  </div>
</template>


<script setup>

/*
JournalPage.vue

Ova komponenta je **parent** za JournalForm i JournalList, drži state svih bilješki
i kontrolira filtering, localStorage i pop-upove.

State:
- notes (Array) → lista svih bilješki
- noteToEdit (Object|null) → bilješka koja se trenutno editira; prosljeđuje se JournalForm
- filterDate (String) → datum za filtriranje bilješki
- popupMessage (String) → tekst za pop-up
- showPopup (Boolean) → kontrola vidljivosti pop-upa

Props:
- Nema, sve dolazi iz unutarnjeg state-a

Emits:
- Nema, jer parent hvata evente child komponenti i obrađuje ih direktno

Event flow:
1. JournalForm emit-a:
   - 'add-note' → poziva se addNote(note) → dodaje u notes i triggera pop-up
   - 'update-note' → poziva se updateNote(updatedNote) → zamjenjuje bilješku i triggera pop-up

2. JournalList emit-a:
   - 'delete-note' → poziva se deleteNote(id) → briše bilješku iz notes i triggera pop-up
   - 'edit-note' → poziva se editNote(note) → postavlja noteToEdit za JournalForm

Dodatno:
- triggerPopup(message) → prikazuje popupMessage na 2 sekunde
- filteredNotes (computed) → filtrira bilješke po filterDate
- localStorage:
    - učitava bilješke na mount iz localStorage
    - watch na notes → svaki update zapisuje u localStorage

UI:
- Filter po datumu input
- Pop-up div (pokazuje se kad se doda, update ili delete)
- JournalForm i JournalList komponenta
*/


import { ref, computed, watch } from 'vue'
import JournalList from '../components/JournalList.vue'
import JournalForm from '../components/JournalForm.vue'

const notes = ref([])
const noteToEdit = ref(null)
const filterDate = ref('')

const popupMessage = ref('')  // poruka za popup
const showPopup = ref(false)  // kontrola vidljivosti


const editNote = (note) => noteToEdit.value = note

const addNote = (note) => {
  notes.value.push(note)
  triggerPopup('Note added!')
}

const updateNote = (updatedNote) => {
  const index = notes.value.findIndex(n => n.id === updatedNote.id)
  if (index !== -1) notes.value[index] = updatedNote
  noteToEdit.value = null
  triggerPopup('Note updated!')
}

const deleteNote = (id) => {
  notes.value = notes.value.filter(n => n.id !== id)
  triggerPopup('Note deleted!')
}

const triggerPopup = (message) => {
  popupMessage.value = message
  showPopup.value = true
  setTimeout(() => {
    showPopup.value = false
  }, 2000)  // popup traje 2 sekunde
}


// computed za filtrirane bilješke
const filteredNotes = computed(() => {
  if (!filterDate.value) return notes.value
  return notes.value.filter(n => n.date === filterDate.value)
})


// učitaj s localStorage na mount
if (localStorage.getItem('journalNotes')) {
  notes.value = JSON.parse(localStorage.getItem('journalNotes'))
}

// svaki put kad notes promijeni vrijednost, pohrani u localStorage
watch(notes, (newNotes) => {
  localStorage.setItem('journalNotes', JSON.stringify(newNotes))
}, { deep: true })

</script>
<style>
.popup {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  z-index: 1000;
}

</style>