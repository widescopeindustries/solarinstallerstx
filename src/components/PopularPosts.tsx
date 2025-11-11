import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export const PopularPosts = () => {
  // Get featured posts and top posts by ID (most recent/important)
  const popularPosts = blogPosts
    .filter(post => post.featured)
    .slice(0, 4);

  if (popularPosts.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-card to-muted/20 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Popular Articles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="block group"
            >
              <div className="flex items-start justify-between gap-3 hover:bg-muted/50 p-3 rounded-lg transition-colors">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {post.readTime} • {post.category}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border/50">
          <Link
            to="/blog"
            className="text-sm text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
          >
            View all articles
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
