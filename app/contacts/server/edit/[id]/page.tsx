import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function updateContact(formData: FormData, id: string) {
  "use server";
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  await supabase.from("contacts").update({ name, email, phone }).eq("id", id);
  redirect("/contacts/server");
}

export default async function EditContactPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { data: contact } = await supabase
    .from("contacts")
    .select()
    .eq("id", params.id)
    .single();

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateContact(formData, params.id);
  }

  return (
    <form action={handleUpdate} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Edit Contact</h1>
      <input
        type="text"
        name="name"
        defaultValue={contact?.name}
        className="w-full border rounded p-2"
      />
      <input
        type="email"
        name="email"
        defaultValue={contact?.email}
        className="w-full border rounded p-2"
      />
      <input
        type="tel"
        name="phone"
        defaultValue={contact?.phone}
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
