"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function NotesClientPage() {
  const supabase = createClient();
  interface Note {
    id: number;
    title: string;
  }

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await supabase
        .from("notes")
        .select()
        .order("id", { ascending: false });
      setNotes(data || []);
    }
    fetchNotes();
  }, [supabase]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Notes (Client)</h1>

      <Link
        href="/notes/client/new"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Note
      </Link>

      <ul className="mt-4 space-y-2">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex justify-between items-center border rounded p-2"
          >
            <span>{note.title}</span>
            <div className="space-x-3">
              <Link
                href={`/notes/client/edit/${note.id}`}
                className="text-sm text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <Link
                href={`/notes/client/delete/${note.id}`}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
