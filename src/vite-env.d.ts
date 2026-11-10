/// <reference types="vite/client" />

// Types for our own VITE_* variables (see .env).
interface ImportMetaEnv {
  readonly VITE_USE_MOCKS?: 'true' | 'false'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
