"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Props {
  params: { id: string };
}

export default function EditContactClientPage({ params }: Props) {
  const supabase = createClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContact() {
      const { data } = await supabase
        .from("contacts")
        .select()
        .eq("id", params.id)
        .single();

      if (data) {
        setName(data.name);
        setEmail(data.email || "");
        setPhone(data.phone || "");
      }
      setLoading(false);
    }

    fetchContact();
  }, [params.id, supabase]);

  async function updateContact(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    await supabase
      .from("contacts")
      .update({ name, email, phone })
      .eq("id", params.id);
    router.push("/contacts/client");
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Loading contact...</p>
      </div>
    );
  }

  return (
    <form onSubmit={updateContact} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Edit Contact (Client)</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded p-2"
        required
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded p-2"
      />

      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
