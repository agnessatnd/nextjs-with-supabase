import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default function NewTodoPage() {
  async function createTodo(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const title = formData.get('title') as string

    await supabase.from('todos').insert({ title })
    redirect('/todo')
  }

  return (
    <form action={createTodo} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">New TODO</h1>
      <input
        type="text"
        name="title"
        className="w-full border rounded p-2"
        placeholder="Enter TODO..."
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Save
      </button>
    </form>
  )
}