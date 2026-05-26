import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ── Tenants ──────────────────────────────────────────────────────────────
  const agencyTenant = await db.tenant.upsert({
    where: { slug: 'apex-agency' },
    update: {},
    create: {
      id: 'tenant_agency_001',
      slug: 'apex-agency',
      name: 'Studio Apex',
      domain: 'studioapex.com',
      plan: 'ENTERPRISE',
      settings: {
        primaryColor: '#C9A84C',
        accentColor: '#0A0A0A',
        calendlyUrl: 'https://calendly.com/studioapex/discovery',
      },
    },
  })

  const ptTenant = await db.tenant.upsert({
    where: { slug: 'apex-pt' },
    update: {},
    create: {
      id: 'tenant_pt_002',
      slug: 'apex-pt',
      name: 'Apex Performance',
      domain: 'apexperformance.io',
      plan: 'ENTERPRISE',
      settings: {
        primaryColor: '#22D3EE',
        accentColor: '#111827',
        calendlyUrl: 'https://calendly.com/apexperformance/intake',
      },
    },
  })

  // ── Super Admin User ───────────────────────────────────────────────────────
  const superAdmin = await db.user.upsert({
    where: { email: 'admin@studioapex.com' },
    update: {},
    create: {
      clerkId: 'placeholder_clerk_id',
      email: 'admin@studioapex.com',
      firstName: 'Apex',
      lastName: 'Admin',
    },
  })

  // Connect super admin to both tenants
  await db.userTenant.upsert({
    where: { userId_tenantId: { userId: superAdmin.id, tenantId: agencyTenant.id } },
    update: {},
    create: { userId: superAdmin.id, tenantId: agencyTenant.id, role: 'SUPER_ADMIN' },
  })

  await db.userTenant.upsert({
    where: { userId_tenantId: { userId: superAdmin.id, tenantId: ptTenant.id } },
    update: {},
    create: { userId: superAdmin.id, tenantId: ptTenant.id, role: 'SUPER_ADMIN' },
  })

  // ── Default Pipelines ─────────────────────────────────────────────────────
  const agencyPipeline = await db.pipeline.create({
    data: {
      tenantId: agencyTenant.id,
      name: 'Agency Sales Pipeline',
      isDefault: true,
      stages: {
        create: [
          { name: 'New Lead', order: 1, color: '#6B7280' },
          { name: 'Discovery Call', order: 2, color: '#3B82F6' },
          { name: 'Proposal Sent', order: 3, color: '#8B5CF6' },
          { name: 'Negotiating', order: 4, color: '#F59E0B' },
          { name: 'Closed Won', order: 5, color: '#10B981' },
        ],
      },
    },
  })

  await db.pipeline.create({
    data: {
      tenantId: ptTenant.id,
      name: 'PT Client Pipeline',
      isDefault: true,
      stages: {
        create: [
          { name: 'New Inquiry', order: 1, color: '#6B7280' },
          { name: 'Assessment Booked', order: 2, color: '#22D3EE' },
          { name: 'Assessment Done', order: 3, color: '#3B82F6' },
          { name: 'Program Selected', order: 4, color: '#8B5CF6' },
          { name: 'Active Client', order: 5, color: '#10B981' },
        ],
      },
    },
  })

  // ── Feature Flags ─────────────────────────────────────────────────────────
  const flags = [
    { key: 'ai-chatbot-enabled', value: false },
    { key: 'ai-lead-scoring', value: true },
    { key: 'ai-proposal-generation', value: false },
    { key: 'stripe-checkout', value: true },
    { key: 'blog-enabled', value: true },
  ]

  for (const flag of flags) {
    await db.featureFlag.upsert({
      where: { tenantId_key: { tenantId: agencyTenant.id, key: flag.key } },
      update: {},
      create: { tenantId: agencyTenant.id, ...flag },
    })
    await db.featureFlag.upsert({
      where: { tenantId_key: { tenantId: ptTenant.id, key: flag.key } },
      update: {},
      create: { tenantId: ptTenant.id, ...flag },
    })
  }

  // ── Sample Contacts & Leads (agency) ──────────────────────────────────────
  const sampleContact = await db.contact.upsert({
    where: { tenantId_email: { tenantId: agencyTenant.id, email: 'sample@techcorp.com' } },
    update: {},
    create: {
      tenantId: agencyTenant.id,
      email: 'sample@techcorp.com',
      firstName: 'Alex',
      lastName: 'Rivera',
      company: 'TechCorp',
      jobTitle: 'CEO',
      tags: ['high-value', 'saas'],
    },
  })

  await db.lead.create({
    data: {
      tenantId: agencyTenant.id,
      contactId: sampleContact.id,
      title: 'TechCorp — Brand Redesign + Website',
      status: 'QUALIFIED',
      source: 'ORGANIC_SEARCH',
      value: 25000,
      probability: 0.7,
      notes: 'Looking for full brand overhaul. Budget confirmed. Decision by end of month.',
      createdById: superAdmin.id,
      pipelineId: agencyPipeline.id,
    },
  })

  console.log('✅ Seed complete!')
  console.log(`   Agency tenant: ${agencyTenant.id}`)
  console.log(`   PT tenant: ${ptTenant.id}`)
  console.log(`   Super admin: ${superAdmin.email}`)
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
