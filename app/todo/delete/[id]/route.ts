import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = await createClient();
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.redirect(new URL("/todo", request.url));
}
