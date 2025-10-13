import { NextResponse } from "next/server";

let notes = [
  { id: 1, title: "First note" },
  { id: 2, title: "Second note" },
];

export async function GET() {
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newNote = { id: notes.length + 1, title: body.title };
  notes.push(newNote);
  return NextResponse.json(newNote, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const note = notes.find((n) => n.id === body.id);
  if (!note) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }
  note.title = body.title;
  return NextResponse.json(note);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  notes = notes.filter((n) => n.id !== body.id);
  return NextResponse.json({ message: "Note deleted" });
}