const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, text: "Learn Vue", done: false },
  { id: 2, text: "Build demo", done: false }
];

// GET all
app.get('/todos', (req, res) => {
  res.json(todos);
});

// ADD
app.post('/todos', (req, res) => {
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
    done: false
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// UPDATE
app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.sendStatus(404);

  todo.text = req.body.text ?? todo.text;
  res.json(todo);
});

// MARK AS DONE
app.patch('/todos/:id/done', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.sendStatus(404);

  todo.done = true;
  res.json(todo);
});

// DELETE
app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.sendStatus(204);
});

app.listen(3000, () => console.log("Server running on 3000"));
