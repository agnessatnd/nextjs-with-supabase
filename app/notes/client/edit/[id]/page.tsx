"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Props {
  params: { id: string };
}

export default function EditNoteClientPage({ params }: Props) {
  const supabase = createClient();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      const { data, error } = await supabase
        .from("notes")
        .select("title")
        .eq("id", params.id)
        .single();

      if (error) console.error("Error fetching note:", error.message);
      else setTitle(data.title);

      setLoading(false);
    }

    fetchNote();
  }, [params.id, supabase]);

  async function updateNote(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    await supabase.from("notes").update({ title }).eq("id", params.id);
    router.push("/notes/client");
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Loading note...</p>
      </div>
    );
  }

  return (
    <form onSubmit={updateNote} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Edit Note (Client)</h1>
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Update
      </button>
    </form>
  );
}
