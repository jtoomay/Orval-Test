import { createFileRoute } from "@tanstack/react-router";
import { useListTodos } from "../api/endpoints";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { data, isPending, isError, error, isFetching, refetch } =
    useListTodos();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Todos</h1>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isFetching ? "Fetching..." : "Refetch"}
        </button>
      </div>

      {isPending ? (
        <p className="text-slate-500">Loading...</p>
      ) : isError ? (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-red-700">
          Error:
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      ) : (
        <ul className="divide-y divide-slate-200 rounded border border-slate-200 bg-white">
          {data.data.map((todo) => (
            <li key={todo.id} className="flex items-center gap-3 px-4 py-3">
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                  todo.done
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300"
                }`}
              >
                {todo.done ? "✓" : ""}
              </span>
              <span className={todo.done ? "text-slate-400 line-through" : ""}>
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
