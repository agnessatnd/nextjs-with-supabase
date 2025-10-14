import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createContact(formData: FormData) {
  "use server";
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  await supabase.from("contacts").insert({ name, email, phone });
  redirect("/contacts/server");
}

export default function NewContactPage() {
  return (
    <form action={createContact} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">New Contact</h1>
      <input
        type="text"
        name="name"
        placeholder="Full name"
        required
        className="w-full border rounded p-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border rounded p-2"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        className="w-full border rounded p-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  );
}
