# src/mocks

Starts MSW in the browser using the handlers Orval generated in `src/api/endpoints.msw.ts`.

`browser.ts` creates the worker. `src/main.tsx` starts it before React renders, but only when
`VITE_USE_MOCKS=true` in `.env` and only in development.
