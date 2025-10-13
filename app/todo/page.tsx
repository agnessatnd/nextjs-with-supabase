import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function TodoPage() {
  const supabase = await createClient();
  const { data: todos } = await supabase
    .from("todos")
    .select()
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My TODOs</h1>
      <Link
        href="/todo/new"
        className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Add TODO
      </Link>
      <ul className="mt-4 space-y-2">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border rounded p-2"
          >
            <span>{todo.title}</span>
            <div className="space-x-3">
              <Link
                href={`/todo/edit/${todo.id}`}
                className="text-sm text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <form
                action={`/todo/delete/${todo.id}`}
                method="post"
                className="inline"
              >
                <button
                  type="submit"
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
