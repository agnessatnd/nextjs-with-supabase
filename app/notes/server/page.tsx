import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function NotesPage() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select().order('created_at', { ascending: false })

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <Link
        href="/notes/new"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Note
      </Link>
      <ul className="mt-4 space-y-2">
        {notes?.map((note) => (
          <li key={note.id} className="flex justify-between items-center border rounded p-2">
            <span>{note.title}</span>
            <form action={`/notes/delete/${note.id}`} method="post">
              <button
                type="submit"
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}