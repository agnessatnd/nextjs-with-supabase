import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function EditNotePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { data: note } = await supabase
    .from("notes")
    .select()
    .eq("id", params.id)
    .single();

  async function updateNote(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const title = formData.get("title") as string;

    await supabase.from("notes").update({ title }).eq("id", params.id);
    redirect("/notes/server");
  }

  return (
    <form action={updateNote} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Edit Note</h1>
      <textarea
        name="title"
        defaultValue={note?.title}
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