"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Contact {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
}

export default function ContactsClientPage() {
  const supabase = createClient();
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    async function fetchContacts() {
      const { data } = await supabase
        .from("contacts")
        .select()
        .order("id", { ascending: false });
      setContacts(data || []);
    }

    fetchContacts();
  }, [supabase]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contacts (Client)</h1>

      <Link
        href="/contacts/client/new"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Contact
      </Link>

      <ul className="mt-4 space-y-2">
        {contacts.map((c) => (
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
                href={`/contacts/client/edit/${c.id}`}
                className="text-sm text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <Link
                href={`/contacts/client/delete/${c.id}`}
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