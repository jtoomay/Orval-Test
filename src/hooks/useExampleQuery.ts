// Placeholder query hook. Later, replace fetchTodos with a real fetch to the
// (MSW-mocked) API, or swap this hook out for the Orval-generated hooks in src/api/.
import { useQuery } from '@tanstack/react-query'

export type Todo = { id: number; title: string; done: boolean }

const sampleTodos: Todo[] = [
  { id: 1, title: 'Scaffold the app', done: true },
  { id: 2, title: 'Add MSW mocks', done: false },
  { id: 3, title: 'Generate hooks with Orval', done: false },
]

function fetchTodos(): Promise<Todo[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(sampleTodos), 500)
  })
}

export function useExampleQuery() {
  return useQuery({ queryKey: ['todos'], queryFn: fetchTodos })
}
