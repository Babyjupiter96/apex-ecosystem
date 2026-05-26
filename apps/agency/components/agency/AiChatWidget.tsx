'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, ArrowRight, Minimize2 } from 'lucide-react'
import { cn } from '@apex/ui'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const STARTERS = [
  'I need a new website',
  'Help me generate more leads',
  'I want to automate my marketing',
  'Tell me about your services',
]

export function AiChatWidget() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm the Studio Apex assistant. What are you trying to achieve for your business? I can help point you to the right service — or just book you a call.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Show teaser bubble after 8 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 8000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function sendMessage(text?: string) {
    const content = text ?? input.trim()
    if (!content || loading) return

    const userMsg: Message = { role: 'user', content }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.message }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Something went wrong. Try refreshing.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Teaser bubble */}
      {showBubble && !open && (
        <div
          onClick={() => { setOpen(true); setShowBubble(false) }}
          className="fixed bottom-24 right-6 z-40 bg-brand-graphite border border-brand-border rounded-2xl rounded-br-none px-4 py-3 max-w-[220px] shadow-gold cursor-pointer hover:border-brand-gold/40 transition-all animate-fade-up"
        >
          <p className="text-sm text-brand-offwhite">Need help figuring out where to start? 👋</p>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => { setOpen(!open); setShowBubble(false); setMinimized(false) }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-gold text-brand-black rounded-full flex items-center justify-center shadow-gold hover:bg-brand-gold-light transition-all hover:scale-105"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className={cn(
            'fixed bottom-24 right-6 z-40 w-[360px] bg-brand-graphite border border-brand-border rounded-2xl shadow-gold overflow-hidden flex flex-col transition-all duration-200',
            minimized ? 'h-14' : 'h-[520px]',
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-brand-border bg-brand-black">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-black text-xs font-bold">
                SA
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-offwhite leading-none">Studio Apex</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <p className="text-[10px] text-brand-muted">Online now</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setMinimized(!minimized)}
              className="text-brand-muted hover:text-brand-offwhite transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-brand-border">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    <div
                      className={cn(
                        'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                        msg.role === 'user'
                          ? 'bg-brand-gold text-brand-black rounded-br-sm'
                          : 'bg-brand-black border border-brand-border text-brand-offwhite rounded-bl-sm',
                      )}
                    >
                      {msg.content}
                      {msg.role === 'assistant' && msg.content.includes('discovery') && (
                        <Link
                          href="/funnels/discovery"
                          className="mt-2 flex items-center gap-1.5 text-xs text-brand-gold hover:text-brand-gold-light transition-colors font-semibold"
                        >
                          Book a call <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-brand-black border border-brand-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-brand-muted animate-bounce"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick starters (only on first message) */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {STARTERS.map(s => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs border border-brand-border text-brand-muted hover:border-brand-gold hover:text-brand-gold px-3 py-1.5 rounded-full transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-4 pb-4 pt-2 border-t border-brand-border">
                <form
                  onSubmit={e => { e.preventDefault(); sendMessage() }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask me anything…"
                    className="flex-1 h-10 px-4 bg-brand-black border border-brand-border rounded-full text-sm text-brand-offwhite placeholder:text-brand-muted/60 focus:outline-none focus:border-brand-gold transition-colors"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="w-10 h-10 rounded-full bg-brand-gold text-brand-black flex items-center justify-center hover:bg-brand-gold-light transition-colors disabled:opacity-40"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
