import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(2000),
  })).max(20),
})

const SYSTEM_PROMPT = `You are a friendly and knowledgeable assistant for Studio Apex, a luxury creative agency.

Studio Apex specializes in:
- Brand Identity: logos, visual systems, brand guidelines (from $8,500)
- Web Design & Development: Next.js sites optimized for conversion (from $14,000)
- SEO: technical SEO, content strategy, authority building (from $3,500/mo)
- Sales Funnels: landing pages, email sequences, A/B testing (from $12,000)
- Marketing Automation: CRM setup, AI lead scoring, behavioral triggers (from $7,500)
- Lead Generation: LinkedIn outreach, cold email, list building (from $4,500/mo)
- Automation Services: social bots, web scrapers, lead lists, email sequences, workflow automation

Your role is to:
1. Understand what the visitor is trying to achieve
2. Recommend the most relevant service(s) for their situation
3. Qualify them gently (company type, goal, budget range, timeline)
4. Encourage booking a discovery call at /funnels/discovery

Keep responses concise (2-3 sentences max). Be warm, direct, and avoid corporate jargon.
Never make up pricing beyond what's listed above. If unsure, suggest a discovery call.`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages } = chatSchema.parse(body)

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      // Graceful fallback when OpenAI not configured
      return NextResponse.json({
        message: "Thanks for reaching out! Our team would love to learn more about your goals. Book a free discovery call at /funnels/discovery and we'll be in touch within 24 hours.",
      })
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 250,
        temperature: 0.7,
      }),
    })

    if (!response.ok) throw new Error(`OpenAI error: ${response.status}`)

    const data = await response.json()
    const message = data.choices?.[0]?.message?.content ?? 'Something went wrong. Please try again.'

    return NextResponse.json({ message })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
    console.error('[chat] error:', err)
    return NextResponse.json({
      message: "I'm having a moment — try refreshing or book a call directly at /funnels/discovery.",
    })
  }
}
