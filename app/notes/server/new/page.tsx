import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default function NewNotePage() {
  async function createNote(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const title = formData.get('title') as string

    await supabase.from('notes').insert({ title })
    redirect('/notes')
  }

  return (
    <form action={createNote} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">New Note</h1>
      <textarea
        name="title"
        className="w-full border rounded p-2"
        placeholder="Write your note..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  )
}