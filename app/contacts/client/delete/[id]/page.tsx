"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Props {
  params: { id: string };
}

export default function DeleteContactClientPage({ params }: Props) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function deleteContact() {
      await supabase.from("contacts").delete().eq("id", params.id);
      router.push("/contacts/client");
    }

    deleteContact();
  }, [params.id, supabase, router]);

  return (
    <div className="p-6 text-center">
      <p className="text-gray-600">Deleting contact...</p>
    </div>
  );
}
