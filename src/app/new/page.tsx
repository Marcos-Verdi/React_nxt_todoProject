import React from 'react'
import Link from 'next/link'
import { prisma } from '@/db'
import { redirect } from 'next/navigation'

async function createTodo(data: FormData) {
  "use server"
  const title = data.get('title')?.valueOf()

  if (typeof title !== 'string' || title.length === 0) {
    throw new Error("Invalid Entry")
  }

  await prisma.todo.create({ data: { title:title, complete:false } })

  redirect("/")
}

export default function New() {
  return (
    <>
      <header className='flex justify-between align-center mb-4'>
          <h1 className='text-2x1'>New</h1>
      </header>
      <form action={createTodo} className='flex gap-2 flex-col'>
        <input type='input'
              name='title'
              className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100' />
        <div className='flex gap-2 justify-end mt-5'>
          <Link href='..' 
                className='border border-slate-300 rounded text-slate-300 px-2 py-1 hover:bg-slate-700'>
            Cancel
          </Link>
          <button type='submit' 
                  className='border border-slate-300 rounded text-slate-300 px-2 py-1 hover:bg-slate-700'>
                    Submit
          </button>
        </div>
      </form>
    </>
  )
}
