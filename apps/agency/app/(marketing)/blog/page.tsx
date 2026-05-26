import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { BLOG_POSTS, FEATURED_POST } from '@/lib/data/blog-posts'
import { sanityFetch } from '@/lib/sanity'
import { blogPostsQuery } from '@/lib/queries'
import type { BlogPost } from '@/lib/types'
import { NewsletterForm } from '@/components/agency/NewsletterForm'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Brand strategy, SEO tactics, funnel design, and growth marketing insights from the Studio Apex team.',
}

export const revalidate = 3600

async function getPosts(): Promise<BlogPost[]> {
  const sanityPosts = await sanityFetch<BlogPost[]>(blogPostsQuery)
  return sanityPosts ?? BLOG_POSTS
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

const ALL_CATEGORIES = ['All', 'Brand Strategy', 'SEO', 'Sales Funnels', 'Marketing Automation', 'Lead Generation', 'Analytics', 'CRO']

export default async function BlogPage() {
  const posts = await getPosts()
  const featured = posts.find(p => p.featured) ?? posts[0]
  const rest = posts.filter(p => p._id !== featured._id)

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-brand-black relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] rounded-full bg-brand-gold/4 blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-brand-gold uppercase tracking-[0.35em] text-xs font-semibold mb-8">Insights</p>
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-display font-light leading-[0.92] text-brand-offwhite max-w-3xl mb-8">
            The Studio Apex
            <br />
            <em className="text-brand-gold not-italic">playbook</em>
          </h1>
          <p className="text-brand-muted text-xl max-w-xl leading-relaxed">
            Brand strategy, growth tactics, and honest takes on what's actually working
            in marketing right now — no fluff.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="pb-8 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block border border-brand-border hover:border-brand-gold/30 transition-all rounded-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-[4/3] lg:aspect-auto overflow-hidden bg-brand-graphite">
                <img
                  src={featured.coverImageUrl ?? ''}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
                    Featured
                  </span>
                  {featured.categories[0] && (
                    <span className="text-xs text-brand-muted uppercase tracking-widest">
                      {featured.categories[0]}
                    </span>
                  )}
                </div>
                <h2 className="text-3xl lg:text-4xl font-display font-light text-brand-offwhite group-hover:text-brand-gold transition-colors mb-4">
                  {featured.title}
                </h2>
                <p className="text-brand-muted leading-relaxed mb-8">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-brand-offwhite">{featured.author.name}</p>
                    <p className="text-xs text-brand-muted">{formatDate(featured.publishedAt)}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readingTime} min read
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-16 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-display font-light text-brand-offwhite">All Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group border border-brand-border hover:border-brand-gold/30 transition-all rounded-lg overflow-hidden flex flex-col"
              >
                {post.coverImageUrl && (
                  <div className="aspect-video overflow-hidden bg-brand-graphite">
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  {post.categories[0] && (
                    <span className="text-xs text-brand-gold uppercase tracking-widest font-semibold mb-3">
                      {post.categories[0]}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-brand-offwhite group-hover:text-brand-gold transition-colors mb-3 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-border">
                    <p className="text-xs text-brand-muted">{formatDate(post.publishedAt)}</p>
                    <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                      <Clock className="w-3 h-3" />
                      {post.readingTime} min
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-brand-graphite border-t border-brand-border">
        <div className="max-w-xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-display font-light text-brand-offwhite mb-4">
            Stay sharp
          </h2>
          <p className="text-brand-muted mb-8 leading-relaxed">
            Monthly dispatch: what's working in growth marketing, real case study breakdowns,
            and tools worth your time. No spam.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}
