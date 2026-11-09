import { defineConfig } from 'orval'

export default defineConfig({
  todos: {
    input: {
      target: './openapi.yaml',
    },
    output: {
      target: './src/api/endpoints.ts',
      client: 'react-query',
      mock: true,
    },
  },
})
