# Orval + MSW Playground

A tiny Todo app that shows how **Orval** and **MSW** work together.

> **The big idea:** write your API down **once** in `openapi.yaml`. Orval turns it
> into typed React Query hooks *and* fake API handlers. You can build the whole
> frontend before the backend exists.

**Stack:** Vite · React · TypeScript · TanStack Query · TanStack Router · Tailwind · Express

---

## 🚀 Quick start (2 minutes)

```bash
npm install
```

Create a `.env` file in the project root (it's git-ignored):

```bash
VITE_USE_MOCKS=true
```

Run it:

```bash
npm run dev
```

Open http://localhost:5173. You'll see random todos. **There's no backend running. MSW is faking it.** ✨

---

## 🗺️ How it fits together

```
            openapi.yaml   ← you edit this
                 │
           npx orval       ← generates code
                 │
     ┌───────────┴────────────┐
     ▼                        ▼
 endpoints.ts            endpoints.msw.ts
 (typed hooks)           (fake API handlers)
     │                        │
     ▼                        ▼
 your React components ──► MSW answers in the browser
                          (or the real Express server)
```

| File | What it is | Edit it? |
|---|---|---|
| `openapi.yaml` | The API contract | ✅ Yes |
| `orval.config.ts` | Tells Orval what to generate | ✅ Sometimes |
| `src/api/*` | Generated code | ❌ Never (regenerate instead) |
| `src/mocks/browser.ts` | Starts MSW | Rarely |
| `server/index.ts` | Real Express backend | ✅ Yes |

---

## 🧬 Orval in 30 seconds

**What it does:** reads your OpenAPI spec and writes the client code for you.

**1. Describe an endpoint** in `openapi.yaml`:

```yaml
/todos:
  get:
    operationId: listTodos   # ← this name becomes the hook name
    responses:
      '200':
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/Todo'
```

**2. Generate:**

```bash
npx orval
```

**3. Use the hook it made.** It's fully typed, so you write no fetch code by hand:

```tsx
import { useListTodos } from '../api/endpoints'

function HomePage() {
  const { data, isPending } = useListTodos()
  if (isPending) return <p>Loading...</p>

  return data.data.map((todo) => <li key={todo.id}>{todo.title}</li>)
}
```

> 💡 `GET` makes a query hook (`useListTodos`). `POST` makes a mutation hook (`useCreateTodo`).

---

## 🎭 MSW in 30 seconds

**What it does:** intercepts `fetch` calls *in the browser* and returns fake data.
Your app thinks it's talking to a real server.

Orval already generated the handlers, so wiring MSW up takes 2 lines (`src/mocks/browser.ts`):

```ts
import { setupWorker } from 'msw/browser'
import { getTodoAPIMock } from '../api/endpoints.msw'

export const worker = setupWorker(...getTodoAPIMock())
```

The worker starts before React renders (`src/main.tsx`), but only in dev and only when mocks are on.

**Want specific data instead of random data?** Pass an override:

```ts
import { getListTodosMockHandler } from '../api/endpoints.msw'

setupWorker(
  getListTodosMockHandler([{ id: 1, title: 'Buy milk', done: false }]),
)
```

---

## 🔀 Mock API vs. real API

Flip one value in `.env`, then **restart `npm run dev`**.

| `VITE_USE_MOCKS` | Who answers requests | What to run |
|---|---|---|
| `true` | MSW (fake data) | `npm run dev` |
| `false` | Express on `:3001` | `npm run server` **and** `npm run dev` |

Vite proxies `/todos` to the Express server, so the frontend code is the same either way.

> 🔒 MSW never ships in a production build.

---

## ✅ Why bother?

- **No hand-written fetch code.** Hooks, types and query keys are generated.
- **Types can't drift.** Frontend, mocks *and* the Express server all import the same types.
- **Don't wait on the backend.** Build the UI against mocks on day one.
- **Change the API in one place.** Edit the spec, run `npx orval`, and TypeScript shows you everything that broke.
- **Realistic fake data for free.** Mocks use Faker and follow your schema.

---

## 🛠️ Adding a new endpoint

1. Add it to `openapi.yaml` (give it an `operationId`)
2. Run `npx orval`
3. Use the new `use...` hook in a component
4. *(Optional)* Implement it in `server/index.ts`

The mock works right away. You don't need step 4 to see it in the browser.

---

## 📜 Scripts

| Command | Does |
|---|---|
| `npm run dev` | Start the app (http://localhost:5173) |
| `npm run server` | Start the real API (http://localhost:3001) |
| `npx orval` | Regenerate `src/api/` from the spec |
| `npm run build` | Type-check + production build |
| `npm run lint` | Lint with Oxlint |

---

## 🧯 Gotchas

- **Changed `.env` and nothing happened?** Restart `npm run dev`.
- **Edited a file in `src/api/` and it vanished?** It's generated. Edit `openapi.yaml` and rerun `npx orval`.
- **Mock data looks random every refresh?** That's Faker. Use an override handler (see above) for fixed data.
- **Real-API mode shows errors?** Make sure `npm run server` is running.

---

📚 Learn more: [Orval docs](https://orval.dev) · [MSW docs](https://mswjs.io) · [TanStack Query](https://tanstack.com/query)
