import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = '2024-06-01'

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

export function urlFor(source: { asset?: { _ref: string } }) {
  if (!builder || !source?.asset) return { url: () => '' }
  return builder.image(source)
}

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T | null> {
  if (!sanityClient) return null
  try {
    return await sanityClient.fetch<T>(query, params ?? {})
  } catch {
    return null
  }
}
