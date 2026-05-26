import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ClientNav } from '@/components/client/ClientNav'

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <div className="min-h-screen bg-brand-black flex">
      <ClientNav />
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}
