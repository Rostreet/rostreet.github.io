import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { getAllCategories, getAllPostsMeta } from "@/lib/posts";

export default function PostsPage() {
  const allPosts = getAllPostsMeta();
  const categories = ["全部", ...getAllCategories()];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">文章</h1>
          <p className="text-xl text-muted-foreground">分享技术见解和学习心得</p>
        </header>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    category === "全部"
                      ? "bg-foreground text-background"
                      : "bg-accent text-foreground hover:bg-accent/80"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {allPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group block rounded-xl border border-border/40 bg-card hover:border-border/80 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-accent text-foreground font-medium text-xs">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-border/40 hover:border-border/80 transition-all disabled:opacity-50"
              disabled
            >
              上一页
            </button>
            <button type="button" className="px-4 py-2 rounded-lg bg-foreground text-background">
              1
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-border/40 hover:border-border/80 transition-all"
            >
              2
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-border/40 hover:border-border/80 transition-all"
            >
              3
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-border/40 hover:border-border/80 transition-all"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
