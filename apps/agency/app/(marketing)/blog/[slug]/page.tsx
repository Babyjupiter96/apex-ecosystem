import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react'
import { BLOG_POSTS, getBlogPostBySlug } from '@/lib/data/blog-posts'
import { sanityFetch } from '@/lib/sanity'
import { blogPostBySlugQuery, relatedPostsQuery } from '@/lib/queries'
import type { BlogPost } from '@/lib/types'

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: post.coverImageUrl ? [{ url: post.coverImageUrl, width: 1200, height: 630 }] : [],
    },
  }
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const sanityPost = await sanityFetch<BlogPost>(blogPostBySlugQuery, { slug })
  return sanityPost ?? getBlogPostBySlug(slug) ?? null
}

async function getRelated(slug: string): Promise<BlogPost[]> {
  const sanityRelated = await sanityFetch<BlogPost[]>(relatedPostsQuery, { slug })
  return sanityRelated ?? BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

// Static blog body since we're using fallback data (no Sanity blocks)
function StaticPostBody({ post }: { post: BlogPost }) {
  return (
    <div className="prose-content space-y-6 text-brand-muted text-lg leading-relaxed">
      <p>
        {post.excerpt}
      </p>
      <p>
        This is a preview of the full article. When Sanity CMS is connected, the full
        PortableText body will render here. Add your{' '}
        <code className="font-mono text-sm bg-brand-graphite text-brand-gold px-1.5 py-0.5 rounded">
          NEXT_PUBLIC_SANITY_PROJECT_ID
        </code>{' '}
        to enable live content from the studio.
      </p>
      <blockquote className="border-l-2 border-brand-gold pl-6 my-8 text-xl text-brand-offwhite font-light italic">
        Great marketing doesn't feel like marketing — it feels like the answer to a question
        your customer was already asking.
      </blockquote>
      <p>
        The most effective strategies we've deployed share one characteristic: they're built
        on genuine customer insight rather than assumptions about what the market wants.
        Before any tactic, before any creative, before any budget allocation — talk to
        your best existing customers. Record the words they use to describe their problems.
        Use those exact words in your marketing.
      </p>
      <h2 className="text-3xl font-display font-light text-brand-offwhite mt-14 mb-6">
        The framework that changes everything
      </h2>
      <p>
        Most brands optimize for the wrong thing. They measure clicks, impressions, reach —
        proxies for real business outcomes. We measure pipeline created, revenue influenced,
        and customer lifetime value. Every decision flows backward from those numbers.
      </p>
      <p>
        When you orient your entire marketing system around revenue outcomes rather than
        vanity metrics, the strategy becomes obvious. You stop doing things that feel good
        and start doing things that compound.
      </p>
    </div>
  )
}

export default async function BlogPostPage({ params }: Params) {
  const [post, related] = await Promise.all([
    getPost(params.slug),
    getRelated(params.slug),
  ])

  if (!post) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author.name },
    publisher: { '@type': 'Organization', name: 'Studio Apex', url: 'https://studioapex.com' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-brand-black">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs text-brand-muted uppercase tracking-widest hover:text-brand-gold transition-colors mb-10"
          >
            <ArrowLeft className="w-3 h-3" /> All Articles
          </Link>

          {post.categories[0] && (
            <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-6">
              {post.categories[0]}
            </p>
          )}

          <h1 className="text-[clamp(2rem,5vw,4rem)] font-display font-light leading-[1.05] text-brand-offwhite mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-brand-muted leading-relaxed mb-10">{post.excerpt}</p>

          <div className="flex items-center justify-between py-6 border-y border-brand-border">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-brand-graphite border border-brand-border flex items-center justify-center text-brand-gold font-semibold text-sm">
                {post.author.name[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-brand-offwhite">{post.author.name}</p>
                <p className="text-xs text-brand-muted">{post.author.bio.split('.')[0]}.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-brand-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImageUrl && (
        <div className="max-w-5xl mx-auto px-6 lg:px-12 mb-16">
          <div className="aspect-[21/9] overflow-hidden rounded-lg bg-brand-graphite">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Body */}
      <section className="pb-24 bg-brand-black">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <StaticPostBody post={post} />
        </div>
      </section>

      {/* Author bio */}
      <section className="py-16 bg-brand-graphite border-y border-brand-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-brand-black border border-brand-border flex items-center justify-center text-brand-gold font-display text-2xl shrink-0">
              {post.author.name[0]}
            </div>
            <div>
              <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold mb-2">Written by</p>
              <h3 className="text-xl font-semibold text-brand-offwhite mb-2">{post.author.name}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-24 bg-brand-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-4xl font-display font-light text-brand-offwhite">More Articles</h2>
              <Link
                href="/blog"
                className="text-sm text-brand-muted hover:text-brand-gold transition-colors uppercase tracking-widest inline-flex items-center gap-2"
              >
                All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p._id}
                  href={`/blog/${p.slug}`}
                  className="group border border-brand-border hover:border-brand-gold/30 transition-all rounded-lg overflow-hidden"
                >
                  {p.coverImageUrl && (
                    <div className="aspect-video overflow-hidden bg-brand-graphite">
                      <img
                        src={p.coverImageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-semibold text-brand-offwhite group-hover:text-brand-gold transition-colors mb-2 text-sm">
                      {p.title}
                    </h3>
                    <p className="text-xs text-brand-muted flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {p.readingTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-brand-graphite border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-display font-light text-brand-offwhite mb-6">
            Want this for your business?
          </h2>
          <p className="text-brand-muted text-lg mb-10">
            Book a free strategy call and let's build your growth plan.
          </p>
          <Link
            href="/funnels/discovery"
            className="inline-flex items-center gap-3 bg-brand-gold text-brand-black px-10 py-5 text-sm font-semibold tracking-wide uppercase hover:bg-brand-gold-light transition-colors"
          >
            Book Discovery Call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
