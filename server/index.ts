// =============================================================================
// Tiny real backend for the Todo API described in ../openapi.yaml.
//
// - Data lives in an in-memory array (resets when the server restarts).
// - Types come from the Orval-generated client, so the server, the frontend
//   hooks, and the MSW mocks all share the same contract from openapi.yaml.
//
// Run with: npm run server   (listens on http://localhost:3001)
// =============================================================================
import express from "express";
import type { NewTodo, Todo } from "../src/api/endpoints.ts";

const PORT = 3001;

const app = express();
app.use(express.json()); // parse JSON request bodies into req.body

let nextId = 4;
const todos: Todo[] = [
  { id: 1, title: "Try out Orval", done: true },
  { id: 2, title: "Set up MSW", done: true },
  { id: 3, title: "Talk to a real backend", done: false },
  { id: 4, title: 'This is a "Real" backend', done: false },
];

// GET /todos -> operationId: listTodos
app.get("/todos", (_req, res) => {
  res.json(todos);
});

// POST /todos -> operationId: createTodo
app.post("/todos", (req, res) => {
  const body = req.body as Partial<NewTodo> | undefined;
  if (typeof body?.title !== "string" || body.title.trim() === "") {
    res.status(400).json({ message: "title is required" });
    return;
  }
  const todo: Todo = { id: nextId++, title: body.title.trim(), done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// GET /todos/{id} -> operationId: getTodo
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) {
    res.status(404).end(); // spec: 404 has no body
    return;
  }
  res.json(todo);
});

app.listen(PORT, () => {
  console.log(`Todo API listening on http://localhost:${PORT}`);
});
