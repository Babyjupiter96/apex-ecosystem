import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@apex/db'

export default async function ClientDashboard() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: { tenants: { include: { tenant: true } } },
  })

  return (
    <div className="min-h-screen bg-brand-black pt-24 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-brand-gold text-xs uppercase tracking-widest mb-2">Client Portal</p>
          <h1 className="text-4xl font-display font-light text-brand-offwhite">
            Welcome back, {user?.firstName ?? 'there'}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-brand-graphite border border-brand-border rounded-xl p-6">
            <p className="text-brand-muted text-sm mb-2">Active Projects</p>
            <p className="text-4xl font-display text-brand-gold">—</p>
          </div>
          <div className="bg-brand-graphite border border-brand-border rounded-xl p-6">
            <p className="text-brand-muted text-sm mb-2">Invoices</p>
            <p className="text-4xl font-display text-brand-gold">—</p>
          </div>
          <div className="bg-brand-graphite border border-brand-border rounded-xl p-6">
            <p className="text-brand-muted text-sm mb-2">Next Meeting</p>
            <p className="text-4xl font-display text-brand-gold">—</p>
          </div>
        </div>
      </div>
    </div>
  )
}
