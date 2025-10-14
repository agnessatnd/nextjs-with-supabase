import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ContactsPage() {
  "use server";
  const supabase = await createClient();
  const { data: contacts } = await supabase
    .from("contacts")
    .select()
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <Link
        href="/contacts/server/new"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Contact
      </Link>
      <ul className="mt-4 space-y-2">
        {contacts?.map((c) => (
          <li
            key={c.id}
            className="flex justify-between items-center border rounded p-2"
          >
            <span>
              <strong>{c.name}</strong> — {c.email || "no email"} —{" "}
              {c.phone || "no phone"}
            </span>
            <div className="space-x-3">
              <Link
                href={`/contacts/server/edit/${c.id}`}
                className="text-sm text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <form
                action={`/contacts/server/delete/${c.id}`}
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
