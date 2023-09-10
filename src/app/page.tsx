import React from 'react'
import Link from 'next/link'
import { prisma } from '@/db'
import {TodoItem} from '@/components/TodoItem'

function getTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: {id: id}, data: {complete: complete} })
}

export default async function Home() {   
  const todos = await getTodos()

  return (
      <>
        <header className='flex justify-between align-center mb-4'>
          <h1 className='text-2x1'>Todos</h1>
          <Link href='/new' 
                className='border border-slate-300 rounded text-slate-300 px-2 py-1 hover:bg-slate-700'>
                  New
          </Link>
        </header>
        <ul className='pl-4'>
          {todos.map(t => (
            <TodoItem key={t.id} {...t} toggleTodo={toggleTodo}/>
          ))}
        </ul>
      </>
  )
}
