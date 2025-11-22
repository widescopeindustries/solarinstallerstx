import { unstable_cache } from 'next/cache'

/**
 * Server-side blog data utilities
 * Imports from static blog data and provides caching/filtering utilities
 */

// Dynamic import to ensure blog posts are loaded fresh
export async function getAllBlogPosts() {
  const { blogPosts } = await import('@/data/blogPosts')
  return blogPosts
}

// Get blog post by slug
export const getBlogPostBySlug = unstable_cache(
  async (slug: string) => {
    const posts = await getAllBlogPosts()
    return posts.find(post => post.slug === slug)
  },
  ['blog-post-by-slug'],
  { revalidate: 86400 } // Static content, 24 hour cache
)

// Get recent blog posts
export const getRecentBlogPosts = unstable_cache(
  async (limit = 5) => {
    const posts = await getAllBlogPosts()
    return posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
  },
  ['recent-blog-posts'],
  { revalidate: 86400 }
)

// Get blog posts by category
export const getBlogPostsByCategory = unstable_cache(
  async (category: string) => {
    const posts = await getAllBlogPosts()
    return posts.filter(post => post.category === category)
  },
  ['blog-posts-by-category'],
  { revalidate: 86400 }
)

// Get all blog categories
export const getAllBlogCategories = unstable_cache(
  async () => {
    const posts = await getAllBlogPosts()
    const categories = new Set<string>()

    posts.forEach(post => {
      if (post.category) {
        categories.add(post.category)
      }
    })

    return Array.from(categories).sort()
  },
  ['all-blog-categories'],
  { revalidate: 86400 }
)

// Get related blog posts (same category, excluding current)
export const getRelatedBlogPosts = unstable_cache(
  async (slug: string, limit = 3) => {
    const posts = await getAllBlogPosts()
    const currentPost = posts.find(post => post.slug === slug)

    if (!currentPost || !currentPost.category) {
      return posts.slice(0, limit)
    }

    const relatedPosts = posts
      .filter(post => post.slug !== slug && post.category === currentPost.category)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)

    // If not enough related posts, fill with recent posts
    if (relatedPosts.length < limit) {
      const recentPosts = posts
        .filter(post => post.slug !== slug && !relatedPosts.includes(post))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit - relatedPosts.length)

      return [...relatedPosts, ...recentPosts]
    }

    return relatedPosts
  },
  ['related-blog-posts'],
  { revalidate: 86400 }
)

// Get blog post count
export const getBlogPostCount = unstable_cache(
  async () => {
    const posts = await getAllBlogPosts()
    return posts.length
  },
  ['blog-post-count'],
  { revalidate: 86400 }
)

// Search blog posts by title or excerpt
export async function searchBlogPosts(query: string) {
  const posts = await getAllBlogPosts()
  const lowerQuery = query.toLowerCase()

  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt?.toLowerCase().includes(lowerQuery) ||
    post.category?.toLowerCase().includes(lowerQuery)
  )
}
