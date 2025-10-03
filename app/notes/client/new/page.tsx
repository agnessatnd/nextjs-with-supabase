'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function NewNoteClientPage() {
  const supabase = createClient()
  const router = useRouter()
  const [title, setTitle] = useState('')

  async function addNote(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    await supabase.from('notes').insert({ title })
    router.push('/notes/client')
  }

  return (
    <form onSubmit={addNote} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">New Note (Client)</h1>
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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