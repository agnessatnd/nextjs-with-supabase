'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Props {
  params: { id: string }
}

export default function DeleteNoteClientPage({ params }: Props) {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function deleteNote() {
      await supabase.from('notes').delete().eq('id', params.id)
      router.push('/notes/client')
    }
    deleteNote()
  }, [params.id, supabase, router])

  return (
    <div className="p-6 text-center">
      <p className="text-gray-600">Deleting note...</p>
    </div>
  )
}