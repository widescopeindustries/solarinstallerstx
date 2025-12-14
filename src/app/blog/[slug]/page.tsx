import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { blogPosts, getBlogPostBySlug } from '@/data/blogPosts'
import DOMPurify from 'isomorphic-dompurify'

interface Props {
  params: Promise<{ slug: string }>
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const canonicalUrl = `https://solarinstallerstx.com/blog/${slug}`

  return {
    title: `${post.title} | Texas Solar Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.lastUpdated,
      modifiedTime: post.lastUpdated,
      authors: [post.author],
      url: canonicalUrl,
      siteName: 'Solar Installers TX',
      images: [
        {
          url: 'https://solarinstallerstx.com/opengraph-image',
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['https://solarinstallerstx.com/opengraph-image'],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Legacy content for the original incentives post
  const legacyContent = `
      <h2>Major Changes to Texas Solar Incentives in 2025</h2>
      <p>Texas homeowners looking to go solar in 2025 have excellent incentive opportunities. Here's what's new and what you need to know to maximize your savings.</p>

      <h3>1. Federal Solar Tax Credit Remains at 30%</h3>
      <p>The federal Investment Tax Credit (ITC) remains at <strong>30% through 2032</strong>, down from the previous scheduled decrease. This means Texas homeowners can deduct 30% of their total solar system cost from their federal taxes.</p>

      <h4>What's Covered:</h4>
      <ul>
        <li>Solar panels and racking</li>
        <li>Inverters and electrical equipment</li>
        <li>Battery storage systems (added in 2023)</li>
        <li>Installation labor costs</li>
        <li>Permit fees and inspections</li>
      </ul>

      <h3>2. CPS Energy (San Antonio) Rebate Updates</h3>
      <p>CPS Energy has <strong>increased rebates</strong> for residential solar installations:</p>
      <ul>
        <li><strong>Previous:</strong> $0.50/watt</li>
        <li><strong>New (2025):</strong> $0.60/watt for systems up to 25kW</li>
        <li><strong>Maximum rebate:</strong> $15,000 per residential installation</li>
      </ul>

      <h3>3. Oncor Service Territory Enhancements</h3>
      <p>Oncor (serving Dallas, Fort Worth, and much of North Texas) has implemented new programs:</p>
      <ul>
        <li>Enhanced net metering credits</li>
        <li>Streamlined interconnection process (now 10-15 business days)</li>
        <li>New battery storage incentive pilot program</li>
      </ul>

      <h3>4. Property Tax Exemption Remains Strong</h3>
      <p>Texas continues to offer <strong>100% property tax exemption</strong> on the added value from solar installations. This exemption:</p>
      <ul>
        <li>Applies to both residential and commercial properties</li>
        <li>Has no expiration date</li>
        <li>Transfers with property sale</li>
        <li>Saves average homeowner $300-500 annually</li>
      </ul>

      <h2>How to Maximize Your 2025 Solar Savings</h2>

      <h3>Step 1: Calculate Your Potential Savings</h3>
      <p>Use our solar calculator to estimate your specific savings based on your location, energy usage, and system size.</p>

      <h3>Step 2: Get Multiple Quotes</h3>
      <p>Compare quotes from <strong>at least 3 NABCEP certified installers</strong>. Our directory includes 500+ certified professionals across Texas.</p>

      <h2>Get Started Today</h2>
      <p>With the 30% federal tax credit, strong utility rebates, and property tax exemptions, 2025 is an excellent year to go solar in Texas.</p>
    `

  // Use legacy content for the original incentives post, otherwise use post content
  const rawContent = slug === "texas-solar-incentives-january-2025" && post.content.includes("[Previous blog post content")
    ? legacyContent
    : post.content

  // Sanitize HTML content to prevent XSS attacks
  const displayContent = DOMPurify.sanitize(rawContent, {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'br', 'div', 'span', 'table', 'tr', 'td', 'th', 'blockquote', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'class', 'id', 'target', 'rel', 'style']
  })

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <article>
        {/* Post Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="text-sm text-muted-foreground">{post.readTime}</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          </div>

          {post.lastUpdated && (
            <div className="text-sm text-muted-foreground italic">
              Last updated: {post.lastUpdated}
            </div>
          )}
        </div>

        {/* Post Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />

        {/* CTA Card */}
        <Card className="my-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Go Solar in Texas?</h3>
            <p className="text-muted-foreground mb-6">
              Get free quotes from NABCEP certified solar installers in your area. Compare prices, reviews, and find the best solar solution for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/quote">Get Free Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/installers">Browse Installers</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts could go here */}
      </article>

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `https://solarinstallerstx.com/blog/${slug}#article`,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://solarinstallerstx.com/blog/${slug}`
            },
            "headline": post.title,
            "description": post.excerpt,
            "image": {
              "@type": "ImageObject",
              "url": "https://solarinstallerstx.com/opengraph-image",
              "width": 1200,
              "height": 630
            },
            "datePublished": post.lastUpdated,
            "dateModified": post.lastUpdated,
            "author": {
              "@type": "Organization",
              "name": post.author,
              "url": "https://solarinstallerstx.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Solar Installers TX",
              "logo": {
                "@type": "ImageObject",
                "url": "https://solarinstallerstx.com/opengraph-image",
                "width": 1200,
                "height": 630
              }
            },
            "keywords": post.keywords.join(", "),
            "articleSection": post.category,
            "inLanguage": "en-US"
          })
        }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://solarinstallerstx.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://solarinstallerstx.com/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://solarinstallerstx.com/blog/${slug}`
              }
            ]
          })
        }}
      />
    </main>
  )
}
