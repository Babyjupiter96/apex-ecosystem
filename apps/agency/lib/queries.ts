export const blogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  author->{ name, bio, image },
  categories,
  readingTime,
  featured,
  seo
}`

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  author->{ name, bio, image },
  categories,
  readingTime,
  body,
  seo
}`

export const caseStudiesQuery = `*[_type == "caseStudy"] | order(year desc) {
  _id,
  title,
  "slug": slug.current,
  client,
  industry,
  services,
  year,
  coverImageUrl,
  tagline,
  metrics,
  featured
}`

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  client,
  industry,
  services,
  year,
  coverImageUrl,
  heroImageUrl,
  tagline,
  challenge,
  approach,
  results,
  metrics,
  images,
  testimonial
}`

export const relatedPostsQuery = `*[_type == "blogPost" && slug.current != $slug] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  categories,
  readingTime
}`
