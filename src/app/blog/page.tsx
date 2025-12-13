import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react'
import { blogPosts, getFeaturedPosts } from '@/data/blogPosts'

export const metadata: Metadata = {
  title: 'Texas Solar Blog | Expert Insights & Latest Updates',
  description: 'Stay updated on Texas solar incentives, installation guides, NABCEP certification news, and renewable energy trends. Expert insights for Texas homeowners.',
  keywords: ['texas solar blog', 'solar news', 'solar incentives updates', 'solar installation guides', 'texas renewable energy'],
  openGraph: {
    title: 'Texas Solar Blog | Solar Installers TX',
    description: 'Expert insights, latest incentive updates, and solar installation guides for Texas homeowners',
    type: 'website',
    url: 'https://solarinstallerstx.com/blog',
    images: [
      {
        url: '/opengraph-image.svg',
        width: 1200,
        height: 630,
        alt: 'Texas Solar Blog - Expert Insights & Latest Updates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Solar Blog | Solar Installers TX',
    description: 'Expert insights, latest incentive updates, and solar installation guides for Texas homeowners',
    images: ['/opengraph-image.svg'],
  },
  alternates: {
    canonical: 'https://solarinstallerstx.com/blog',
  },
}

export const revalidate = 3600 // Revalidate every hour

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts()
  const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 9)

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium">Blog</li>
        </ol>
      </nav>

      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Texas Solar Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Expert insights, latest incentive updates, and solar installation guides for Texas homeowners
        </p>
      </div>

      {/* Featured Post */}
      {featuredPosts.map((post) => (
        <Card key={post.id} className="mb-12 overflow-hidden hover:shadow-xl transition-shadow">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center p-12">
              <TrendingUp className="h-32 w-32 text-primary opacity-50" />
            </div>
            <CardContent className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="default">Featured</Badge>
                <Badge variant="secondary">{post.category}</Badge>
              </div>
              <h2 className="text-3xl font-bold mb-4 hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <span>{post.readTime}</span>
              </div>
              <Button asChild size="lg">
                <Link href={`/blog/${post.slug}`}>
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </div>
        </Card>
      ))}

      {/* Recent Posts */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <Button asChild variant="ghost" size="sm" className="p-0 h-auto">
                  <Link href={`/blog/${post.slug}`}>
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8 md:p-12">
        <h2 className="text-2xl font-bold mb-4">Ready to Go Solar in Texas?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Connect with NABCEP certified solar installers in your area and start saving with Texas solar incentives.
        </p>
        <Button asChild size="lg">
          <Link href="/quote">Get My Free Quote</Link>
        </Button>
      </section>
    </main>
  )
}
