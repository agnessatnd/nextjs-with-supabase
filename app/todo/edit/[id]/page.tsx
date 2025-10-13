import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function EditTodoPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  const { data: todo } = await supabase
    .from('todos')
    .select()
    .eq('id', params.id)
    .single()

  async function updateTodo(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const title = formData.get('title') as string

    await supabase.from('todos').update({ title }).eq('id', params.id)
    redirect('/todo')
  }

  return (
    <form action={updateTodo} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Edit TODO</h1>
      <textarea
        name="title"
        defaultValue={todo?.title}
        className="w-full border rounded p-2"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Update
      </button>
    </form>
  )
}